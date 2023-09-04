import { EmbeddingModels, HandleRequest, HttpRequest, HttpResponse, Kv, Llm, Router, Sqlite } from "@fermyon/spin-sdk"
import { checkCacheExpiry, fetchDataFromWebpage, send404response, sendResponse } from "./utils"

// Base URL for fermyon blog
const BASE_URL = "https://www.fermyon.com/blog/"

interface EmbeddingRequest {
  blogPath: string
}

function listTable() {
  let db = Sqlite.openDefault()
  let url = db.execute("SELECT url FROM blog_posts", [])
  return sendResponse(200, {}, JSON.stringify(url))
}

async function addEmbedding(request: HttpRequest) {
  let data = request.json() as EmbeddingRequest

  let db = Sqlite.openDefault()

  let { title, description } = await fetchDataFromWebpage(BASE_URL + data.blogPath)
  let embedding = Llm.generateEmbeddings(EmbeddingModels.AllMiniLmL6V2, [description]).embeddings[0]

  db.execute("INSERT INTO blog_posts (url, title, description, embedding) VALUES(?, ?, ?, ?) ON CONFLICT(url) DO UPDATE SET title=excluded.title,description=excluded.description,embedding=excluded.embedding", [data.blogPath, title, description, JSON.stringify(embedding)])
  console.log("successfully inserted data")
  updateVirtualTable()

  return sendResponse(200, {}, `inserted embedding for ${data.blogPath}\n`)
}

async function getRecommendations(request: HttpRequest) {
  let store = Kv.openDefault()
  let data = request.json() as EmbeddingRequest
  if (store.exists(data.blogPath)) {
    let cache = store.getJson(data.blogPath)
    if(!checkCacheExpiry(Date.now(), cache.time)) {
      console.log("responding from cache")
      return sendResponse(200, {}, JSON.stringify(cache.content))
    }
  } 
  let db = Sqlite.openDefault()

  let res = db.execute("select description from blog_posts where url = ?", [data.blogPath])
  let description = res.rows[0][0] as string
  let embedding = Llm.generateEmbeddings(EmbeddingModels.AllMiniLmL6V2, [description]).embeddings[0]
  let values = db.execute("select rowid from vss_blog_posts where vss_search(embedding, ?) limit 6;", [JSON.stringify(embedding)])

  let index: number[] = []
  values.rows.map((k) => {
    index.push(k[0] as number)

  })
  index.shift()
  let result = db.execute("select url,title from blog_posts where rowid in (?,?,?,?,?)", [...index])
  let posts: any = []
  result.rows.map(k => {
    //@ts-ignore
    posts.push({blogPath: k[0], title: k[1]})
  })
  let cache = {
    time: Date.now(),
    content: posts
  }
  // cache responses for 5 minutes
  store.setJson(data.blogPath, cache)
  return sendResponse(200, {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}, JSON.stringify(posts, null, 2))
}

function updateVirtualTable() {
  let db = Sqlite.openDefault()
  db.execute("DELETE FROM vss_blog_posts", [])
  db.execute("INSERT INTO vss_blog_posts(rowid,embedding) SELECT rowid,embedding FROM blog_posts;", [])
  console.log("updated virtual table entries successfully")
}

let router = Router()

// used to list the content of the table
router.get("/listTable", listTable)
router.post("/addEmbedding", async (_, req) => { return await addEmbedding(req) })
// Get recommendation based on current article description
router.post("/getRecommendations", async (_, req) => { return await getRecommendations(req) })
// Catch all 404 route
router.all("*", () => {
  return send404response()
})

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
  return await router.handleRequest(request, request)

}

