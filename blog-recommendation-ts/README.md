## Blog recommendation 

This is a example application showcasing a recommendation system for blogs. Please make sure you've followed prerequiste instructions from the [parent README](../README.md) before following steps below

⚠️ **Note**: This requires v0.6.0 or later of the `js2wasm` plugin. Use the following commands to install it:

```bash
$ spin plugin update
$ spin plugin install js2wasm
```

(If you have previously installed the `canary` version of the plugin, you may need to uninstall first with `spin plugin uninstall js2wasm`.)

### Steps to use

- Create a turso db using personal account and get configs

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

- Create embeddings for all the posts

```bash
./update_embeddings.sh http://localhost:3000
```

- Query for similar articles

```bash
curl -X POST -d '{"blogPath": "scale-to-zero-problem"}' http://localhost:3000/getRecommendations
```