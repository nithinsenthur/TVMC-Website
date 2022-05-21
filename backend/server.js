import express from "express"
import cors from "cors"
import membersRouter from "./api/members.js"
import articlesRouter from "./api/articles.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/members", membersRouter)
app.use("/api/articles", articlesRouter)

app.use('/public', express.static('public'))
app.get('/public/images/:id', (req, res) => {
    res.sendFile(`/public/images/${id}`)
})
app.get('/public/avatars/:id', (req, res) => {
    res.sendFile(`/public/images/${id}`)
})

if(process.env.NODE_ENV === 'production') {
    app.use('*', express.static('client/build'))
}

export default app 

