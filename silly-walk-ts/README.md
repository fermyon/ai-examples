## Silly Walk (TypeScript)

This is a minimal example of using the Fermyon Serverless AI inside of your serverless function.

The code is in `src/index.ts`

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