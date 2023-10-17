## News Feeder (TypeScript)

> The `package.json` needs updating when the final TS/JS SDK is released. Right now you will need to hand edit it to point to the SDK.

This is an example of building a prompt from an RSS feed, and then sending it to Fermyon Serverless AI. It is written in TypeScript

It uses the HTTP rest extension to get an RSS feed from TechCrunch, then it parses the result and builds a prompt, which it sends to Serverless AI.

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
