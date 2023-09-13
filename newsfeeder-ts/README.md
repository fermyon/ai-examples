## News Feeder (TypeScript)

> The `package.json` needs updating when the final TS/JS SDK is released. Right now you will need to hand edit it to point to the SDK.

This is an example of building a prompt from an RSS feed, and then sending it to Fermyon Serverless AI. It is written in TypeScript

It uses the HTTP rest extension to get an RSS feed from TechCrunch, then it parses the result and builds a prompt, which it sends to Serverless AI.
⚠️ **Note**: This requires v0.6.0 or later of the `js2wasm` plugin. Use the following commands to install it:

```bash
$ spin plugin update
$ spin plugin install js2wasm
```

(If you have previously installed the `canary` version of the plugin, you may need to uninstall first with `spin plugin uninstall js2wasm`.)

## Building and Running

```bash
$ npm install 
$ spin build
$ spin up
```
