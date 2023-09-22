# Haiku Generator

This repository contains an pretrained gpt-j-6b-8bit model that generates a haiku in the 5-7-5 format and a simple UI to interact with it.

To download the pretrained model to generate haikus, please use the following commands:

```bash
$ mkdir -p .spin/ai-models
$ cd .spin/ai-models
$ wget https://huggingface.co/fabianmmueller/deep-haiku-gpt-j-6b-8bit/resolve/main/pytorch_model.bin
$ mv pytorch_model.bin gpt-haiku # use (mv pytorch_model.bin llama2-chat) instead for now.
```

## Build and Running 

```bash
$ npm install 
$ spin build
$ spin up
```

You can access the UI at http://localhost:3000. 