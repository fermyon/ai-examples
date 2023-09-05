## Silly Walk (TypeScript)

This is a minimal example of using the Fermyon Serverless AI inside of your serverless function.

The code is in `src/index.ts`

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