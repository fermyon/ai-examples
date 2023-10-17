## OpenAPI Component (Rust)

This is an example of wrapping Spin's LLM SDK in an OpenAPI contract. The API component provides some sensible defaults that are easily overridden in the request's JSON payload. It also contains a Swagger UI component that you can use to interact with the API.

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

## Build and Running 

```bash
$ spin build --up
```

> Note: If you are using the Cloud GPU component, remember to reference the `runtime-config.toml` file, e.g.: `spin build --up --runtime-config-file ./runtime-config.toml`.

Swagger UI should now be available at http://127.0.0.1:3000.

## Deploy the application to Fermyon Cloud

```bash
$ cd api
$ spin deploy
```

Make sure to change the url-reference in the `./client/src/main.rs`` file
