use anyhow::{Context, Result};
use serde::Deserialize;
use spin_sdk::{
    http::{Request, Response},
    http_component, llm,
};

/// A simple Spin HTTP component.
#[http_component]
fn handle_code(req: Request) -> Result<Response> {
    let body = req
        .into_body()
        .and_then(|b| (!b.is_empty()).then_some(b))
        .context("No body")?;
    let body: Body = serde_json::from_slice(&body)
        .map_err(|e| anyhow::anyhow!("could not deserialize body: {e}"))?;
    let prompt = gen_prompt(body.language, &body.prompt);

    let result = llm::infer_with_options(
        llm::InferencingModel::CodellamaInstruct,
        &prompt,
        llm::InferencingParams {
            max_tokens: 400,
            repeat_penalty: 1.1,
            repeat_penalty_last_n_token_count: 64,
            temperature: 0.8,
            top_k: 40,
            top_p: 0.9,
        },
    )?;
    let response = clean_response(&result.text).to_owned().into();

    Ok(http::Response::builder().status(200).body(Some(response))?)
}

#[derive(Deserialize, Clone, Default)]
struct Body {
    prompt: String,
    language: Language,
}

#[derive(Deserialize, Clone, Default)]
#[serde(rename_all = "snake_case")]
enum Language {
    Python,
    #[default]
    Bash,
}

impl Language {
    fn name(&self) -> &str {
        match self {
            Language::Python => "python",
            Language::Bash => "bash",
        }
    }
}

const START_TAG: &str = "[CODE]";
const END_TAG: &str = "[/CODE]";
fn gen_prompt(language: Language, prompt: &str) -> String {
    let name = language.name();
    format!("[INST]
        You are an expert {name} programmer. Write a full {name} script that does the following: {prompt}.
        Your answer should start with a {START_TAG} tag and end with a {END_TAG} tag.
        [/INST]")
}

fn clean_response<'a>(response: &'a str) -> &'a str {
    let mut response = response.trim_start().trim_end();
    if let Some(i) = response.find(START_TAG) {
        response = &response[i + START_TAG.len()..]
    }
    if let Some(i) = response.rfind(END_TAG) {
        response = &response[..i]
    }
    response
}
