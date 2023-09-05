use anyhow::Result;
use bytes::Bytes;
use serde::{Deserialize, Serialize};
use spin_sdk::{
    http::{Params, Request, Response, Router},
    http_component,
};

// constants for inferencing option defaults
const DEFAULT_MAX_TOKENS: u32 = 75;
const DEFAULT_REPEAT_PENALTY: f32 = 1.1;
const DEFAULT_REPEAT_PENALTY_LAST_N_TOKEN_COUNT: u32 = 64;
const DEFAULT_TEMPERATURE: f32 = 0.0;
const DEFAULT_TOP_K: u32 = 40;
const DEFAULT_TOP_P: f32 = 0.9;
const DEFAULT_MODEL: &str = "llama2-chat";
const DEFAULT_SYSTEM_PROMPT: &str = "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.

If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.";

// api data model for inferencing
#[derive(Debug, Serialize, Deserialize)]
pub struct InferRequest {
    pub model: Option<String>,
    pub system_prompt: Option<String>,
    pub user_prompt: String,
    pub options: Option<InferRequestOptions>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InferRequestOptions {
    pub max_tokens: Option<u32>,
    pub repeat_penalty: Option<f32>,
    pub repeat_penalty_last_n_token_count: Option<u32>,
    pub temperature: Option<f32>,
    pub top_k: Option<u32>,
    pub top_p: Option<f32>,
}

impl Default for InferRequestOptions {
    fn default() -> Self {
        InferRequestOptions {
            max_tokens: Some(DEFAULT_MAX_TOKENS),
            repeat_penalty: Some(DEFAULT_REPEAT_PENALTY),
            repeat_penalty_last_n_token_count: Some(DEFAULT_REPEAT_PENALTY_LAST_N_TOKEN_COUNT),
            temperature: Some(DEFAULT_TEMPERATURE),
            top_k: Some(DEFAULT_TOP_K),
            top_p: Some(DEFAULT_TOP_P),
        }
    }
}

impl Into<spin_sdk::llm::InferencingParams> for InferRequestOptions {
    fn into(self) -> spin_sdk::llm::InferencingParams {
        spin_sdk::llm::InferencingParams {
            //TODO: set constants for these defaults
            max_tokens: self.max_tokens.unwrap_or(DEFAULT_MAX_TOKENS),
            repeat_penalty: self.repeat_penalty.unwrap_or(DEFAULT_REPEAT_PENALTY),
            repeat_penalty_last_n_token_count: self
                .repeat_penalty_last_n_token_count
                .unwrap_or(DEFAULT_REPEAT_PENALTY_LAST_N_TOKEN_COUNT),
            temperature: self.temperature.unwrap_or(DEFAULT_TEMPERATURE),
            top_k: self.top_k.unwrap_or(DEFAULT_TOP_K),
            top_p: self.top_p.unwrap_or(DEFAULT_TOP_P),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InferResponse {
    pub text: String,
    pub usage: InferResponseUsage,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InferResponseUsage {
    pub prompt_token_count: u32,
    pub generated_token_count: u32,
}

impl From<spin_sdk::llm::InferencingResult> for InferResponse {
    fn from(result: spin_sdk::llm::InferencingResult) -> Self {
        InferResponse {
            text: result.text,
            usage: InferResponseUsage {
                prompt_token_count: result.usage.prompt_token_count,
                generated_token_count: result.usage.generated_token_count,
            },
        }
    }
}

#[http_component]
fn handle_api(req: Request) -> Result<Response> {
    let component_route = req
        .headers()
        .get("spin-component-route")
        .unwrap()
        .to_str()?;
    let mut router = Router::new();
    router.post(&format!("{}/infer", component_route), handle_infer);
    router.handle(req)
}

fn handle_infer(req: Request, _params: Params) -> Result<Response> {
    // parse the request
    let request: InferRequest =
        serde_json::from_slice(req.body().as_ref().unwrap_or(&Bytes::new()))?;
    let model: spin_sdk::llm::InferencingModel = match request.model.as_deref() {
        Some("llama2-chat") => spin_sdk::llm::InferencingModel::Llama2Chat,
        Some("codellama-instruct") => spin_sdk::llm::InferencingModel::CodellamaInstruct,
        Some(other) => spin_sdk::llm::InferencingModel::Other(other),
        None => spin_sdk::llm::InferencingModel::Other(DEFAULT_MODEL),
    };
    let options: spin_sdk::llm::InferencingParams = request.options.unwrap_or_default().into();

    let system_prompt = request
        .system_prompt
        .unwrap_or(DEFAULT_SYSTEM_PROMPT.to_string());
    let user_prompt = request.user_prompt;

    let prompt = format!(
        "<s>[INST] <<SYS>>\n{}\n<</SYS>>\n\n{} [/INST]",
        system_prompt, user_prompt
    );

    println!("formatted_prompt: {:?}", prompt);

    let inferred_result = spin_sdk::llm::infer_with_options(model, &prompt, options);

    match inferred_result {
        Ok(result) => Ok(http::Response::builder()
            .status(200)
            .header("Content-Type", "application/json")
            .body(Some(
                serde_json::to_string(&InferResponse::from(result))?.into(),
            ))?),

        Err(e) => Ok(http::Response::builder()
            .status(500)
            .body(Some(e.to_string().into()))?),
    }
}
