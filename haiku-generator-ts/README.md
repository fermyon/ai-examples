# Haiku Generator

This repository contains an pretrained gpt-j-6b-8bit model that generates a haiku in the 5-7-5 format and a simple UI to interact with it.

To download the pretrained model to generate haikus, please use the following commands:

```bash
$ git clone https://github.com/fermyon/ai-examples.git
$ cd haiku-generator-rs
$ mkdir -p .spin/ai-models
$ cd .spin/ai-models
# Before running the following code, please note that the model is 26GB and will take quite a long time to download (and use a good chunk of your bandwidth and any data download limits you might have).
$ wget https://huggingface.co/tpmccallum/llama-2-13b-deep-haiku-GGML/resolve/main/llama-2-13b-deep-haiku.ggml.fp16.bin
# Rename the model to align with the application's configuration
$ mv llama-2-13b-deep-haiku.ggml.fp16.bin llama2-chat
```

## Build and Running 

```bash
$ npm install 
$ spin build
$ spin up
```

You can access the UI at http://localhost:3000. 