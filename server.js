import express from "express"
import cors from "cors"
import membersRouter from "./api/members.js"
import articlesRouter from "./api/articles.js"
import { resolve } from "path"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/members", membersRouter)
app.use("/api/articles", articlesRouter)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(resolve(process.cwd(), 'client/build')))
    app.get('*', (req, res) => {
      res.sendFile(resolve(process.cwd(), 'client/build/index.html'))
    })
}

export default app 

