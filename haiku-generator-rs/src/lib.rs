use anyhow::Result;
use spin_sdk::{
    http::{Params, Request, Response, Router},
    http_component,
    llm::{infer, InferencingModel::Llama2Chat},
};

use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct HaikuRequest {
    pub sentence: String,
}

#[derive(Serialize)]
pub struct HaikuResponse {
    pub sentiment: String,
}

//const PROMPT: &str = r#"<s>[INST]<<SYS>>You are a haiku poetry assistant. You will create a Haiku about a given topic using graphemes.The hauki poetry you write for me, will always have 5 syllables in the first line, 7 syllables in the second line and 5 syllables in the 3rd (and final) line.<</SYS>>Please write me a haiku about {SENTENCE} now.[/INST]"#;
const PROMPT: &str = r#"<s>[INST] <<SYS>> You will create a Haiku about a given topic using graphemes. <</SYS>> {SENTENCE} [/INST]"#;
/// A Spin HTTP component that internally routes requests.
#[http_component]
fn handle_route(req: Request) -> Result<Response> {
    let mut router = Router::new();
    router.post("/api/haiku-writing", perform_haiku_writing);
    router.any("/api/*", not_found);
    router.handle(req)
}

fn not_found(_: Request, _: Params) -> Result<Response> {
    Ok(http::Response::builder()
        .status(404)
        .body(Some("Not found".into()))?)
}

fn perform_haiku_writing(req: Request, _params: Params) -> Result<Response> {
    let request = body_json_to_map(&req)?;
    // Do some basic clean up on the input
    let sentence = request.sentence.trim();
    println!("Writing a haiku on the following topic: {}", sentence);

    println!("Running inference");
    let inferencing_result = infer(Llama2Chat, &PROMPT.replace("{SENTENCE}", sentence))?;
    println!("Inference result {:?}", inferencing_result.text);
    send_ok_response(200, inferencing_result.text)
}

fn send_ok_response(code: u16, resp_str: String) -> Result<Response> {
    Ok(http::Response::builder()
        .status(code)
        .body(Some(resp_str.into()))?)
}

fn body_json_to_map(req: &Request) -> Result<HaikuRequest> {
    let body = match req.body().as_ref() {
        Some(bytes) => bytes,
        None => anyhow::bail!("Request body was unexpectedly empty"),
    };

    Ok(serde_json::from_slice(&body)?)
}
