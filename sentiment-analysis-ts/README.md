# Sentiment Analysis

This repository contains an API that performs sentiment analysis and a simple UI to interact with it.

## Setup

TODO: Currently this demo is hardcoded to work on my machine.

## Testing

After you've started the app locally you can test the API via:

```sh
curl --json '{"sentence": "Worst day ever"}' http://localhost:3000/api/sentiment-analysis
```

You can access the UI at http://localhost:3000. The KV-Explorer can be found at http://localhost:3000/internal/kv-explorer.
