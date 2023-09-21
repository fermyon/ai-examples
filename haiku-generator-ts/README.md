# Sentiment Analysis

This repository contains an API that performs sentiment analysis and a simple UI to interact with it.

⚠️ **Note**: This requires v0.6.0 or later of the `js2wasm` plugin. Use the following commands to install it:

```bash
$ spin plugin update
$ spin plugin install js2wasm
```

(If you have previously installed the `canary` version of the plugin, you may need to uninstall first with `spin plugin uninstall js2wasm`.)

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
