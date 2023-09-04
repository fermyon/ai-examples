## Blog recommendation 

This is a example application showcasing a recommendation system for blogs

### Prereqs 

- build spin from the `llm-sdk` branch
- build spin-js-sdk from `add_sdk` branch of https://github.com/karthik2804/spin-js-sdk

see [notion document](https://www.notion.so/fermyon/Spin-AI-Inferencing-Setup-e86964bf27fe48bdaf68d374d23b0e51) for more information.

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
turso db shell <db-name>
- CREATE virtual TABLE vss_blog_posts USING vss0(embedding(384));
```

- Replace the contents of `build` and `@fermyon/spin-sdk` in the dependencies to point at the correct local path as shown in the earlier notion document.. 

- Run using the spin binary with llm support built earlier (replace paths appropriately).

```bash
npm install
~/Work/fermyon/spin/target/release/spin  build -u --runtime-config-file runtime-config.toml --sqlite @migrations.sql
```

- Create embeddings for all the posts

```bash
./update_embeddings.sh http://localhost:3000
```

- Query for similar articles

```bash
curl -X POST -d '{"blogPath": "scale-to-zero-problem"}' http://localhost:3000/getRecommendations
```