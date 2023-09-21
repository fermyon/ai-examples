# Haiku Generator

This repository contains an pretrained gpt-j-6b-8bit model that generates a haiku in the 5-7-5 format and a simple UI to interact with it.

⚠️ **Note**: This requires v0.6.0 or later of the `js2wasm` plugin. Use the following commands to install it:

```bash
$ spin plugin update
$ spin plugin install js2wasm
```

(If you have previously installed the `canary` version of the plugin, you may need to uninstall first with `spin plugin uninstall js2wasm`.)

To download the pretrained model to generate haikus, please use the following commands:

```bash
$ mkdir -p .spin/ai-models
$ cd .spin/ai-models
$ wget https://huggingface.co/fabianmmueller/deep-haiku-gpt-j-6b-8bit/resolve/main/pytorch_model.bin
$ mv pytorch_model.bin gpt-haiku
```

## Build and Running 

```bash
$ npm install 
$ spin build
$ spin up
```

You can access the UI at http://localhost:3000. 