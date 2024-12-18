from spin_sdk import http, llm, key_value
from spin_sdk.http import Request, Response
import json

PROMPT="""<<SYS>>
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
User: """

class IncomingHandler(http.IncomingHandler):
    def handle_request(self, request: Request) -> Response:
        # Extracting the sentence from the request_body
        request_body=json.loads(request.body)
        sentence=request_body["sentence"].strip()
        print("Performing sentiment analysis on: " + sentence)

        # Open the default KV store
        store = key_value.open_default()

        # Check if the sentence is already in the KV store
        if store.exists(sentence) is False:
            result=llm.infer("llama2-chat", PROMPT+sentence).text
            print("Raw result: " + result)
            sentiment = get_sentiment_from_sentence(result)
            print("Storing result in the KV store")
            store.set(sentence, str.encode(sentiment))
        else:
            sentiment = store.get(sentence).decode()
            print("Found a cached result")

        response_body=json.dumps({"sentiment": sentiment})

        return Response(200,
                        {"content-type": "application/json"},
                        bytes(response_body, "utf-8"))

def get_sentiment_from_sentence(sentence) -> str:
    words = sentence.lower().split()
    sentiments = ["positive", "negative", "neutral"]
    result = next((word for word in sentiments if word in words), None)

    if result is not None:
        return result
    else:
        print("Inconclusive, returning 'neutral'")
        return "neutral"
