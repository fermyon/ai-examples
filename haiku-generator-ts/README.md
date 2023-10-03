# Haiku Generator

This repository contains a pre-trained Llama2 model that generates a haiku in the 5-7-5 format and a simple UI to interact with it.

> **NOTE:** This tutorial uses [Meta AI](https://ai.meta.com/)'s Llama 2, Llama Chat and Code Llama models you will need to visit [Meta's Llama webpage](https://ai.meta.com/resources/models-and-libraries/llama-downloads/) and agree to Meta's License, Acceptable Use Policy, and to Meta’s privacy policy before fetching and using Llama models.

To download the pre-trained model to generate haikus, please use the following commands:

```bash
$ git clone https://github.com/fermyon/ai-examples.git
$ cd haiku-generator-ts
$ mkdir -p .spin/ai-models
$ cd .spin/ai-models
# Before running the following code, please note that the model is 26GB and will take quite a long time to download (and use a good chunk of your bandwidth and any data download limits you might have).
$ wget https://huggingface.co/tpmccallum/llama-2-13b-deep-haiku-GGML/resolve/main/llama-2-13b-deep-haiku.ggml.fp16.bin
# Rename the model to align with the application's configuration
$ mv llama-2-13b-deep-haiku.ggml.fp16.bin llama2-chat
$ cd ../.../
```

⚠️ **Note**: This requires v0.6.0 or later of the `js2wasm` plugin. Use the following commands to install it:

```bash
$ spin plugin update
$ spin plugin install js2wasm
```

## Build and Running 

```bash
$ npm install 
$ spin build
$ spin up
```

You can access the UI at http://localhost:3000 and use the web interface or you can use the following curl command:

```bash
curl -X POST http://localhost:3000/api/haiku-writing -H 'Content-Type: application/json' -d '{"sentence":"ChatGPT"}'
```
