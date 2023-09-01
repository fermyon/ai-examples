import { Llm, InferencingModels, HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const model = InferencingModels.Llama2Chat

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
  const prompt = "As a monty python character explain how to walk. Limit to 3 sentences."
  const out = Llm.infer(model, prompt, { maxTokens: 200 })
  return {
    status: 200,
    body: out.text
  }
}
