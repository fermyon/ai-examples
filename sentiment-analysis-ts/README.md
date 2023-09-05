# Sentiment Analysis

This repository contains an API that performs sentiment analysis and a simple UI to interact with it.

⚠️ **Note**: This requires a canary build of the `js2wasm` plugin. Use the following command to install it:

```bash
$ spin plugins install -u https://github.com/fermyon/spin-js-sdk/releases/download/canary/js2wasm.json
```

## Build and Running 

```bash
$ npm install 
$ spin build
$ spin up
```

```bash
$ curl --json '{"sentence": "Worst day ever"}' http://localhost:3000/api/sentiment-analysis
```

You can access the UI at http://localhost:3000. The KV-Explorer can be found at http://localhost:3000/internal/kv-explorer.
