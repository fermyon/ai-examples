#!/bin/sh

file="blog_list.txt"

while read -r post; do
    echo $post
    curl -X POST -d "{\"blogPath\": \"$post\"}" $1/addEmbedding
done <$file 