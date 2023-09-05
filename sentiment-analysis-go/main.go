package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	spinhttp "github.com/fermyon/spin/sdk/go/http"
	"github.com/fermyon/spin/sdk/go/key_value"
	"github.com/fermyon/spin/sdk/go/llm"
)

type sentimentAnalysisRequest struct {
	Sentence string
}

type sentimentAnalysisResponse struct {
	Sentiment string
}

const prompt = `\
<<SYS>>
You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.
<</SYS>>
<INST>
Follow the pattern of the following examples:

User: Hi, my name is Bob
Bot: neutral

User: I am so happy today
Bot: positive

User: I am so sad today
Bot: negative
</INST>

User: {SENTENCE}
`

func init() {
	spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
		router := spinhttp.NewRouter()
		router.POST("/api/sentiment-analysis", performSentimentAnalysis)
		router.ServeHTTP(w, r)
	})
}

func performSentimentAnalysis(w http.ResponseWriter, r *http.Request, ps spinhttp.Params) {
	var req sentimentAnalysisRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Printf("Performing sentiment analysis on: %q\n", req.Sentence)

	// Open the KV store
	store, err := key_value.Open("default")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer key_value.Close(store)

	// If the sentiment of the sentence is already in the KV store, return it
	exists, err := key_value.Exists(store, req.Sentence)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if exists {
		fmt.Println("Found sentence in KV store returning cached sentiment")
		value, err := key_value.Get(store, req.Sentence)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		res := sentimentAnalysisResponse{
			Sentiment: string(value),
		}
		if err := json.NewEncoder(w).Encode(res); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		return
	}
	fmt.Println("Sentence not found in KV store")

	// Otherwise, perform sentiment analysis
	fmt.Println("Running inference")
	params := &llm.InferencingParams{
		MaxTokens:   10,
		Temperature: 0.5,
	}

	result, err := llm.Infer("llama2-chat", strings.Replace(prompt, "{SENTENCE}", req.Sentence, 1), params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Printf("Inference result (%d tokens): %s\n", result.Usage.GeneratedTokenCount, result.Text)

	sentiment := strings.TrimPrefix(result.Text, "Bot: ")

	// Cache the result in the KV store
	fmt.Println("Caching sentiment in KV store")
	key_value.Set(store, req.Sentence, []byte(sentiment))

	res := &sentimentAnalysisResponse{
		Sentiment: sentiment,
	}
	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func main() {}
