# Haiku Generator

This repository contains a pre-trained [llama-2](https://huggingface.co/tpmccallum/llama-2-13b-deep-haiku-GGML) model that generates a haiku in the 5-7-5 format.

To download the pre-trained model and run the pre-written Rust app that generates haikus, please use the following commands:

## Clone the Application's Repository and Download the AI Model

```bash
$ git clone https://github.com/fermyon/ai-examples.git
$ cd haiku-generator-rs
$ mkdir -p .spin/ai-models
$ cd .spin/ai-models
# Before running the following code, please note that the model is 26GB and will take quite a long time to download (and use a good chunk of your bandwidth and any data download limits you might have).
$ wget wget https://huggingface.co/tpmccallum/llama-2-13b-deep-haiku-GGML/resolve/main/llama-2-13b-deep-haiku.ggml.fp16.bin
# Rename the model to align with the application's configuration
$ mv llama-2-13b-deep-haiku.ggml.fp16.bin llama2-chat
```

## Build and Run the Application

```bash
$ cd ../../../haiku-generator-rs
$ spin build --up
```

## Test the Application in the CLI

```bash
$ curl --json '{"sentence": "Please write a haiku about ChatGPT and Grammarly and AI for me now."}' http://localhost:3000/api/haiku-writing
```
