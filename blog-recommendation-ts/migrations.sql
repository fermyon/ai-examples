CREATE TABLE IF NOT EXISTS blog_posts(url TEXT PRIMARY KEY, title TEXT,  description TEXT, embedding BLOB);

DROP TABLE IF EXISTS vss_blog_posts;

CREATE virtual TABLE vss_blog_posts USING vss0(embedding(384));

insert into vss_blog_posts(rowid,embedding) select rowid,embedding from blog_posts;
