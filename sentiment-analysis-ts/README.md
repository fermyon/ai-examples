# Sentiment Analysis

This repository contains an API that performs sentiment analysis and a simple UI to interact with it.

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

## Build and Running 

Install dependencies, build, and run your application. To avoid configuring secrets for the [KV explorer](https://developer.fermyon.com/hub/preview/template_kv_explorer), set an environment variable to skip auth.
```bash
$ npm install 
$ spin build --up --env SPIN_APP_KV_SKIP_AUTH=1
```

> Note: If you are using the Cloud GPU component, remember to reference the `runtime-config.toml` file, e.g.: `spin build --up --env SPIN_APP_KV_SKIP_AUTH=1 --runtime-config-file ./runtime-config.toml`.

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
