# A sentiment analysis application written in Python (that uses Fermyon Serverless AI)

## Install/Update Spin

[Install](https://developer.fermyon.com/spin/install) the latest version of Spin (or [upgrade](https://developer.fermyon.com/spin/upgrade) your already installed version).

## Templates

This application creates Spin HTTP component in Python using the `http-py` template, the functionality to create your own Spin HTTP components in Python can be installed as follows:

```bash
spin templates install --git https://github.com/fermyon/spin-python-sdk --upgrade
```

## Plugins

This application uses the [Spin Python SDK](https://github.com/fermyon/spin-python-sdk), which can be installed/upgraded as follows:

```bash
spin plugins update
spin plugins install py2wasm
```

# Fetch the app

Clone this ai-examples repository:

```bash
git clone https://github.com/fermyon/ai-examples.git
```

# Build the app

```bash
cd cd ai-examples/sentiment-analysis-py
spin build
```

# Deploy the app

Visit [Fermyon Serverless AI ](https://www.fermyon.com/serverless-ai) and sign up to access the [Serverless AI Private Beta](https://developer.fermyon.com/cloud/serverless-ai). The simply type:

```bash
spin deploy
```

## Test the app

```
curl -X POST --data '{"sentence":"Everything is awesome!"}' https://sentiment-analysis-zxrl7aq1.fermyon.app
```



