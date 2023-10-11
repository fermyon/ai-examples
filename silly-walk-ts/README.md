## Silly Walk (TypeScript)

This is a minimal example of using the Fermyon Serverless AI inside of your serverless function.

The code is in `src/index.ts`

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

## Building and Running

```bash
$ npm install 
$ spin build --up
```

> Note: If you are using the Cloud GPU component, remember to reference the `runtime-config.toml` file, e.g.: `spin build --up --runtime-config-file ./runtime-config.toml`.

## Deploy the application to Fermyon Cloud

```bash
$ cd api
$ spin deploy
```
