# Sentiment Analysis 

This example is based on the newer Spin Python SDK based on [`componentize-py`](https://github.com/bytecodealliance/componentize-py).

This repository contains an API that performs sentiment analysis and a simple UI to interact with it.

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

## Build and Running 

```bash
$ python3 -m venv venv
$ source venv/bin/activate
$ pip3 install -r requirements.txt
$ spin build --up
```

> Note: If you are using the Cloud GPU component, remember to reference the `runtime-config.toml` file, e.g.: `spin build --up --runtime-config-file ./runtime-config.toml`.

## Test the Application

```bash
$ curl -X POST --data '{"sentence":"Everything is awesome!"}' https://sentiment-analysis-abc-xyz.fermyon.app/
```

You can access the UI at http://localhost:3000. The KV-Explorer can be found at http://localhost:3000/internal/kv-explorer.

## Deploy the application to Fermyon Cloud

```bash
$ spin deploy
```
