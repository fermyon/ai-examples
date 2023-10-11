# Haiku Generator

This repository contains a Spin application that generates a haiku in the 5-7-5 format and a simple UI to interact with it.

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

## Build and Run the Application

```bash
$ cd ../../../haiku-generator-rs
$ spin build --up
```

> Note: If you are using the Cloud GPU component, remember to reference the `runtime-config.toml` file, e.g.: `spin build --up --runtime-config-file ./runtime-config.toml`.

## Test the Application in the CLI

```bash
$ curl --json '{"sentence": "Please write a haiku about ChatGPT and Grammarly and AI for me now."}' http://localhost:3000/api/haiku-writing
```

## Deploy the application to Fermyon Cloud

```bash
$ spin deploy
```
