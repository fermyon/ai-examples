import {
  HandleRequest,
  HttpRequest,
  HttpResponse,
  Llm,
  InferencingModels,
  InferencingOptions,
  Router,
  Kv,
} from "@fermyon/spin-sdk";

interface SentimentAnalysisRequest {
  sentence: string;
}

interface SentimentAnalysisResponse {
  sentiment: "negative" | "neutral" | "positive";
}

const decoder = new TextDecoder();

const PROMPT = `\
<<SYS>>
You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.
<</SYS>>
[INST]
Follow the pattern of the following examples:

User: Hi, my name is Bob
Bot: neutral

User: I am so happy today
Bot: positive

User: I am so sad today
Bot: negative
[/INST]

User: {SENTENCE}
`;

async function performSentimentAnalysis(request: HttpRequest) {
  // Parse sentence out of request
  let data = request.json() as SentimentAnalysisRequest;
  let sentence = data.sentence.trim();
  console.log("Performing sentiment analysis on: " + sentence);

  // Prepare the KV store
  let kv = Kv.openDefault();

  // If the sentiment of the sentence is already in the KV store, return it
  let cachedSentiment = kv.get(sentence);
  if (cachedSentiment !== null) {
    console.log("Found sentence in KV store returning cached sentiment");
    return {
      status: 200,
      body: JSON.stringify({
        sentiment: decoder.decode(cachedSentiment),
      } as SentimentAnalysisResponse),
    };
  }
  console.log("Sentence not found in KV store");

  // Otherwise, perform sentiment analysis
  console.log("Running inference");
  let options: InferencingOptions = { maxTokens: 6 };
  let inferenceResult = Llm.infer(
    InferencingModels.Llama2Chat,
    PROMPT.replace("{SENTENCE}", sentence),
    options
  );
  console.log(
    `Inference result (${inferenceResult.usage.generatedTokenCount} tokens): ${inferenceResult.text}`
  );
  let sentiment = inferenceResult.text.split(/\s+/)[1]?.trim();

  // Clean up result from inference
  if (
    sentiment === undefined ||
    !["negative", "neutral", "positive"].includes(sentiment)
  ) {
    sentiment = "unsure";
    console.log("Invalid sentiment, marking it as unsure");
  }

  // Cache the result in the KV store
  if (sentiment !== "unsure") {
    console.log("Caching sentiment in KV store");
    kv.set(sentence, sentiment);
  }

  return {
    status: 200,
    body: JSON.stringify({
      sentiment,
    } as SentimentAnalysisResponse),
  };
}

let router = Router();

// Map the route to the handler
router.post("/api/sentiment-analysis", async (_, req) => {
  console.log(`${new Date().toISOString()} POST /sentiment-analysis`);
  return await performSentimentAnalysis(req);
});

// Catch all 404 handler
router.all("/api/*", async (_, _req) => {
  return {
    status: 404,
    body: "Not found",
  };
});

// Entry point to the Spin handler
export const handleRequest: HandleRequest = async function(
  request: HttpRequest
): Promise<HttpResponse> {
  return await router.handleRequest(request, request);
};