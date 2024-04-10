import express from "express"
import ArticlesController from "./articles.controller.js"
import { imageUpload } from "../storage.js"

const articlesRouter = express.Router()

articlesRouter
    .get('/', ArticlesController.apiGetArticles)
    .put('/edit', ArticlesController.editArticle)
    .post('/create', imageUpload("images").single("img"), ArticlesController.createArticle)
    .delete('/delete', ArticlesController.deleteArticle)

export default articlesRouter
