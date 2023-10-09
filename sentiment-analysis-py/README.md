# A Sentiment Analysis Application Written in Python (That Uses Fermyon Serverless AI)

## Install/Update Spin

[Install](https://developer.fermyon.com/spin/install) the latest version of Spin (or [upgrade](https://developer.fermyon.com/spin/upgrade) your already installed version).

### Templates

This application creates Spin HTTP components in Python using the `http-py` template, the functionality to create your own Spin HTTP components in Python can be installed as follows:

```bash
$ spin templates install --git https://github.com/fermyon/spin-python-sdk --upgrade
```

### Plugins

This application uses the [Spin Python SDK](https://github.com/fermyon/spin-python-sdk), which can be installed/upgraded as follows:

```bash
$ spin plugins update
$ spin plugins install py2wasm
```

## Fetch the Python Sentiment Analysis Application

Clone this ai-examples repository:

```bash
$ git clone https://github.com/fermyon/ai-examples.git
```

# Build the Application

```bash
$ cd ai-examples/sentiment-analysis-py
$ spin build
```

# Deploy the Application

Visit [Fermyon Serverless AI ](https://www.fermyon.com/serverless-ai) and sign up to access the [Serverless AI Private Beta](https://developer.fermyon.com/cloud/serverless-ai). Then simply type the following command to deploy your Serverless AI application:

```bash
$ spin deploy
```

## Test the Application

The above command will deploy your application and provide you with a URL `https://sentiment-analysis-abc-xyz.fermyon.app/`. You can call your application using the `curl` command's format shown below:

```
$ curl -X POST --data '{"sentence":"Everything is awesome!"}' https://sentiment-analysis-abc-xyz.fermyon.app/
```

## Result

The result is returned to you as a JSON String

```json
{
    "sentence": "positive"
}
```



