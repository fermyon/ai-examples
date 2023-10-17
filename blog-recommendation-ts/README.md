## Blog recommendation 

This is a example application showcasing a recommendation system for blogs.

Please check the repo's [README](../README.md#prerequisites) for prerequisites for running this example.

This sample uses the Vector extension to sqlite, which is available with [Turso](https://turso.tech/).

### Steps to use

- Create a [Turso database](https://turso.tech/) using personal account and get configs

```bash
turso db create --enable-extensions
# Get the url
turso db show <db-name>
# Create access token
turso db tokens create <db-name> --expiration none 
```

- make a copy of `runtime-config-template.toml` as `runtime-config.toml`  and fill in the details 

- Shell into Turso Db to create virtual table using the `vss` module

```bash
$ turso db shell <db-name>
- CREATE virtual TABLE vss_blog_posts USING vss0(embedding(384));
```

```bash
$ npm install
$ spin  build -u --runtime-config-file runtime-config.toml --sqlite @migrations.sql
```

> Note: If you are using the Cloud GPU component, remember to add the `[llm_compute]` section to the `runtime-config.toml` file.

- Create embeddings for all the posts

```bash
./update_embeddings.sh http://localhost:3000
```

- Query for similar articles

```bash
curl -X POST -d '{"blogPath": "scale-to-zero-problem"}' http://localhost:3000/getRecommendations
```

## Deploy the application to Fermyon Cloud

```bash
$ spin deploy
```
