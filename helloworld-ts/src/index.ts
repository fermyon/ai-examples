import { Llm, InferencingModels, HandleRequest, HttpRequest, HttpResponse } from  "@fermyon/spin-sdk"
const  model = InferencingModels.Llama2Chat
export  const  handleRequest: HandleRequest = async  function (request: HttpRequest): Promise<HttpResponse> {
const  prompt = "Tell me a joke about cats"
const  out = Llm.infer(model, prompt)
return {
	status:  200,
	body:  out.text
	}
}