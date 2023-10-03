import {
  HandleRequest,
  HttpRequest,
  HttpResponse,
  Llm,
  InferencingModels,
  InferencingOptions,
  Router, 
} from "@fermyon/spin-sdk";

interface HaikuRequest {
  sentence: string;
}

interface HaikuResponse {
  sentiment: string;
}

const PROMPT = `\
[INST]
<<SYS>>
You will create a Haiku about a given topic using graphemes.
<</SYS>>
User: {SENTENCE}
[/INST]
`;

async function performHaikuGenerator(request: HttpRequest) {
  // Parse sentence out of request
  let data = request.json() as HaikuRequest;
  let sentence = data.sentence.trim();
  console.log("Generating haiku on: " + sentence);
  console.log("Running inference"); 
  let inferenceResult = Llm.infer(
    InferencingModels.Llama2Chat,
    PROMPT.replace("{SENTENCE}", sentence)
  );
  console.log(
    `Inference result (${inferenceResult.usage.generatedTokenCount} tokens): ${inferenceResult.text}`
  );


  return {
    status: 200,
    body: inferenceResult.text };
}

let router = Router();

// Map the route to the handler
router.post("/api/haiku-writing", async (_, req) => {
  console.log(`${new Date().toISOString()} POST /haiku-writing`);
  return await performHaikuGenerator(req);
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
