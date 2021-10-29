import express from "express"
import ArticlesController from "./articles.controller.js"
import multer from "multer"

const articlesRouter = express.Router()

// Handle uploading article images to disk storage
const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const maxSize = 10*1024*1024
const upload = multer({ storage: storage, limits: { fileSize: maxSize }})

// API endpoints
articlesRouter
    .get('/', ArticlesController.apiGetArticles)
    .put('/edit', ArticlesController.editArticle)
    .post('/create', upload.single('img'), ArticlesController.createArticle)
    .delete('/delete', ArticlesController.deleteArticle)

export default articlesRouter
