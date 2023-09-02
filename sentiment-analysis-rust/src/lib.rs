use anyhow::Result;
use spin_sdk::{
    http::{Params, Request, Response, Router},
    http_component,
    key_value::Store,
    llm::{infer, InferencingModel::Llama2Chat},
};

use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct SentimentAnalysisRequest {
    pub sentence: String,
}

#[derive(Serialize)]
pub struct SentimentAnalysisResponse {
    pub sentiment: String,
}

const PROMPT: &str = r#"\
You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.

Hi, my name is Bob
neutral

I am so happy today
positive

I am so sad today
negative

<SENTENCE>
"#;

/// A Spin HTTP component that internally routes requests.
#[http_component]
fn handle_route(req: Request) -> Result<Response> {
    let mut router = Router::new();
    router.post("/api/sentiment-analysis", perform_sentiment_analysis);
    router.any("/api/*", not_found);
    router.handle(req)
}

fn not_found(_: Request, _: Params) -> Result<Response> {
    Ok(http::Response::builder()
        .status(404)
        .body(Some("Not found".into()))?)
}

fn perform_sentiment_analysis(req: Request, _: Params) -> Result<Response> {
    let request = body_json_to_map(&req)?;
    println!("Performing sentiment analysis on: {}", &request.sentence);

    // Prepare the KV store
    let kv = Store::open_default()?;

    // If the sentiment of the sentence is already in the KV store, return it
    if kv.exists(&request.sentence).unwrap_or(false) {
        println!("Found sentence in KV store returning cached sentiment");
        let sentiment = kv.get(&request.sentence)?;
        let resp = SentimentAnalysisResponse {
            sentiment: std::str::from_utf8(&sentiment)?.to_string(),
        };
        let resp_str = serde_json::to_string(&resp)?;

        return Ok(http::Response::builder()
            .status(200)
            .body(Some(resp_str.into()))?);
    }
    println!("Sentence not found in KV store");

    // Otherwise, perform sentiment analysis
    println!("Running inference");
    let inferencing_result = infer(
        Llama2Chat,
        &PROMPT.clone().replace("<SENTENCE>", &request.sentence),
    )?;
    println!("Inference result {:?}", inferencing_result);
    let sentiment = inferencing_result
        .text
        .split("\n")
        .next()
        .unwrap_or_default();

    // Cache the result in the KV store
    println!("Caching sentiment in KV store");
    kv.set(&request.sentence, sentiment.clone())?;

    let resp = SentimentAnalysisResponse {
        sentiment: sentiment.to_string(),
    };

    let resp_str = serde_json::to_string(&resp)?;
    Ok(http::Response::builder()
        .status(200)
        .body(Some(resp_str.into()))?)
}

fn body_json_to_map(req: &Request) -> Result<SentimentAnalysisRequest> {
    let body = match req.body().as_ref() {
        Some(bytes) => bytes.slice(..),
        None => bytes::Bytes::default(),
    };

    Ok(serde_json::from_slice::<SentimentAnalysisRequest>(&body)?)
}
