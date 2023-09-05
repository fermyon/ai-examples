## News Feeder (TypeScript)

> The `package.json` needs updating when the final TS/JS SDK is released. Right now you will need to hand edit it to point to the SDK.

This is an example of building a prompt from an RSS feed, and then sending it to Fermyon Serverless AI. It is written in TypeScript

It uses the HTTP rest extension to get an RSS feed from TechCrunch, then it parses the result and builds a prompt, which it sends to Serverless AI.

⚠️ **Note**: This requires a canary build of the `js2wasm` plugin. Use the following command to install it:

```bash
$ spin plugins install -u https://github.com/fermyon/spin-js-sdk/releases/download/canary/js2wasm.json
```

## Building and Running

```bash
$ npm install 
$ spin build
$ spin up
```
