from spin_http import Response
from spin_llm import llm_infer
import json
import re

def handle_request(request):
    try:
        result = llm_infer("llama2-chat", "Can you tell me a joke abut cats")
        return Response(200, {"content-type": "text/plain"}, bytes(result.text, "utf-8"))
    except Exception as e:
        return Response(500, {"content-type": "text/plain"}, bytes(f"Error: {str(e)}", "utf-8"))

