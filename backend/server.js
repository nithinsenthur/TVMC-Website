import express from "express"
import cors from "cors"
import membersRouter from "./api/members.js"
import articlesRouter from "./api/articles.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/members", membersRouter)
app.use("/api/articles", articlesRouter)


export default app

