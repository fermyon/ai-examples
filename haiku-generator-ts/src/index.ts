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

const decoder = new TextDecoder();

async function performHaikuGenerator(request: HttpRequest) {
  return {
    status: 200
  };
}

let router = Router();

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
