# Code Generator

This sample uses the [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) model to help you write code.

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

## Build and Run the Spin Application

```bash
$ cd api
$ spin build --up
```

> Note: If you are using the Cloud GPU component, remember to reference the `runtime-config.toml` file, e.g.: `spin build --up --runtime-config-file ./runtime-config.toml`.

## Send requests

You will be using a client application written in Rust to send requests to the Spin application. Run the following command from the root directory to send a request to the application.

```bash
$ cargo r --bin client -- -l bash 'Find how large each directory named "target" is that is found in any subdirectory of my home directory'
```

## Deploy the application to Fermyon Cloud

```bash
$ cd api
$ spin deploy
```

Make sure to change the url-reference in the `./client/src/main.rs`` file
