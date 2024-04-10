import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import membersDAO from "./dao/membersDAO.js"
import articlesDAO from "./dao/articlesDAO.js"

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}  

const port = process.env.PORT || 8000

// connect to mongo
const MongoClient = mongodb.MongoClient

MongoClient.connect(process.env.DB_URI)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await membersDAO.injectDB(client)
        await articlesDAO.injectDB(client)
        app.listen(port)
    })



