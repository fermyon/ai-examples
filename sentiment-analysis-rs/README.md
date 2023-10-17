# Sentiment Analysis

This repository contains an API that performs sentiment analysis and a simple UI to interact with it.

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

## Build and Running 

```bash
$ spin build --up
```

> Note: If you are using the Cloud GPU component, remember to reference the `runtime-config.toml` file, e.g.: `spin build --up --runtime-config-file ./runtime-config.toml`.

## Test the Application

```bash
$ curl --json '{"sentence": "Worst day ever"}' http://localhost:3000/api/sentiment-analysis
```

You can access the UI at http://localhost:3000. The KV-Explorer can be found at http://localhost:3000/internal/kv-explorer.

## Deploy the application to Fermyon Cloud

```bash
$ cd api
$ spin deploy
```

Make sure to change the url-reference in the `./client/src/main.rs`` file
