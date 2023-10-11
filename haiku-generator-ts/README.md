# Haiku Generator

This repository contains a Spin application that generates a haiku in the 5-7-5 format and a simple UI to interact with it.

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

## Build and Running 

```bash
$ npm install 
$ spin build --up
```

> Note: If you are using the Cloud GPU component, remember to reference the `runtime-config.toml` file, e.g.: `spin build --up --runtime-config-file ./runtime-config.toml`.

You can access the UI at http://localhost:3000 and use the web interface or you can use the following curl command:

```bash
curl -X POST http://localhost:3000/api/haiku-writing -H 'Content-Type: application/json' -d '{"sentence":"ChatGPT"}'
```

## Deploy the application to Fermyon Cloud

```bash
$ cd api
$ spin deploy
```
