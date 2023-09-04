## News Feeder (TypeScript)

> The `package.json` needs updating when the final TS/JS SDK is released. Right now you will need to hand edit it to point to the SDK.

This is an example of building a prompt from an RSS feed, and then sending it to Fermyon Serverless AI. It is written in TypeScript

It uses the HTTP rest extension to get an RSS feed from TechCrunch, then it parses the result and builds a prompt, which it sends to Serverless AI.

## Building and Running

> This version is pre-release, so you will need to edit package.json to point to your JS SDK.

In this directory, run `npm install` followed by `spin build`. You can run it locally with `spin up`, but unless you have a very powerful system, this will be slow. To deploy to Fermyon Cloud and use Serverless AI, do a `spin deploy`.
