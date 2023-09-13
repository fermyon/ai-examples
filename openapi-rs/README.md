## OpenAPI Component (Rust)

This is an example of wrapping Spin's LLM SDK in an OpenAPI contract. The API component provides some sensible defaults that are easily overridden in the request's JSON payload. It also contains a Swagger UI component that you can use to interact with the API.

## Build and Running 

```bash
$ spin build
$ spin up
```

Swagger UI should now be available at http://127.0.0.1:3000.
