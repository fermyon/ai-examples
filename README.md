# Fermyon Serverless AI Examples

This repository contains examples of using [Fermyon Serverless AI](https://developer.fermyon.com/cloud/serverless-ai).

## Prerequisites

The following prerequisites are needed to build and run these examples:
- Spin version 1.5.0 or newer. You can find the install and update instructions [here](https://developer.fermyon.com/spin/install#installing-spin).
- The following plugins:
    - js2wasm 0.6.1 `spin plugins install js2wasm`.
    - py2wasm 0.3.2 `spin plugins install py2wasm`.
- Optional, but highly recommended, is to use the [Spin Cloud GPU component](https://github.com/fermyon/spin-cloud-gpu). This offloads inferencing to Fermyon Cloud GPUs, and thus requires a free account to [Fermyon Cloud Serverless AI](https://www.fermyon.com/serverless-ai).
- If you do not want to use the Cloud GPU component, the instructions on how to download the required models for inferencing and embedding can be found [here](https://developer.fermyon.com/spin/ai-sentiment-analysis-api-tutorial#application-structure).

> Note that Fermyon Cloud support is currently in private beta. To apply for access to the private beta, please fill out [this application form](https://fibsu0jcu2g.typeform.com/serverless-ai). 

## Examples overview

Here is a table of the following examples:

| Example Name  | Spin SDK           |  Inferencing     |  Embedding    | Vector DBs |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [blog-recommendation-ts](./blog-recommendation-ts/)  | TypeScript  |    | :white_check_mark:  |  :white_check_mark:  |
| [code-generator-rs](./code-generator-rs/)  | Rust  |  :white_check_mark:  |   |    |
| [haiku-generator-rs](./haiku-generator-rs/)  | Rust  |  :white_check_mark:  |   |    |
| [haiku-generator-ts](./haiku-generator-ts/)  | TypeScript  |  :white_check_mark:  |   |    |
| [newsfeeder-ts](./newsfeeder-ts/)  | Typescript  |   :white_check_mark:  |   |    |
| [openapi-rs](./openapi-rs/)  | Rust  |   :white_check_mark:  |   |    |
| [sentiment-analysis-py](./sentiment-analysis-py/)  |  Rust | :white_check_mark:  |   |    |
| [sentiment-analysis-rs](./sentiment-analysis-rs/)  |  Typescript | :white_check_mark:  |   |    |
| [sentiment-analysis-ts](./sentiment-analysis-ts/)  |  Rust | :white_check_mark:  |   |    |
| [silly-walk-ts](./silly-walk-ts/)  | Typescript | :white_check_mark:  |   |    |

To get started building your own applications, follow [these instructions](https://developer.fermyon.com/spin/serverless-ai-tutorial) to make sure you have installed the correct version of Spin and the necessary SDKs. If you'd like to learn more about the API, visit the [API guide here](https://developer.fermyon.com/spin/serverless-ai-api-guide).
