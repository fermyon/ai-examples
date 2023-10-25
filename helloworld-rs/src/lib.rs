use anyhow::{Context, Result};
use spin_sdk::{
   http::{Request, Response},
   http_component, llm,
};
/// A simple Spin HTTP component.
#[http_component]
fn hello_world(req: Request) -> Result<Response> {
   let model = llm::InferencingModel::Llama2Chat;
   let inference = llm::infer(model, "Can you tell me a joke about cats".into());
   if let Ok(result) = &inference {
    let text = &result.text;
    return Ok(http::Response::builder()
        .status(200)
        .body(Some(text.to_string().into()))?);
} else {
    return Ok(http::Response::builder()
        .status(500) 
        .body(Some("Inference failed".to_string().into()))?);
}
}