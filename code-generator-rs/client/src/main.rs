use clap::{Parser, ValueEnum};
use reqwest::blocking as reqwest;
use serde::Serialize;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    #[arg(short, long, value_enum)]
    /// Language for the task
    language: Language,
    /// Task to perform
    prompt: String,
}

#[derive(Parser, Clone, ValueEnum, Default, Serialize)]
#[serde(rename_all = "snake_case")]
enum Language {
    Python,
    #[default]
    Bash,
}

#[derive(Clone, Serialize)]
struct Body {
    language: Language,
    prompt: String,
}

fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();
    let response = reqwest::Client::new()
        .post("https://code-ehbxedul.fermyon.app")
        .body(serde_json::to_vec(&Body {
            language: cli.language,
            prompt: cli.prompt,
        })?)
        .send()?;
    let response = response.bytes()?;
    let response = std::str::from_utf8(&response)?;
    println!("{}", response);
    Ok(())
}
