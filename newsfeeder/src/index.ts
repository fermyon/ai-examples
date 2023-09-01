import { Llm, InferencingModels, HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"
import * as htmlparser2 from "htmlparser2"

const dec = new TextDecoder()
const model = InferencingModels.Llama2Chat
const MAX_ITEMS = 10;

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

  const data = await fetch('https://techcrunch.com/feed/')
  const body = dec.decode(await data.arrayBuffer())

  let feed = await htmlparser2.parseFeed(body)
  if (feed == null) {
    return {
      status: 500,
      body: "Internal error fetching feed"
    }
  }
  console.log(feed.title)
  var prompt = "Here are today's TechCrunch news items. In the style of a news brief, summarize in one paragraph the the items that have to do with cloud.\n\n"
  const maxItems = feed.items.length > MAX_ITEMS ? MAX_ITEMS : feed.items.length
  for (let index = 0; index < maxItems; index++) {
    const element = feed.items[index]
    prompt += `Item: ${element.title}\n${element.description}\n\n`
  }

  console.log(prompt)
  let response = Llm.infer(model, prompt, { maxTokens: 1000 })
  console.log(`usage: in=${response.usage.promptTokenCount}, out=${response.usage.generatedTokenCount}`)

  return {
    status: 200,
    body: response.text
  }
}
