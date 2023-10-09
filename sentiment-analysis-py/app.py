from spin_http import Response
from spin_llm import llm_infer
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

def handle_request(request):
    request_body=json.loads(request.body)
    sentence=request_body["sentence"].strip()
    result=llm_infer("llama2-chat", PROMPT+sentence)
    response_body=json.dumps({"sentence": result.text})
    return Response(200,
                    {"content-type": "application/json"},
                    bytes(response_body, "utf-8"))