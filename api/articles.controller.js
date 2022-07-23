import articlesDAO from "../dao/articlesDAO.js";
import jwt from "jsonwebtoken"

export default class ArticlesController {
    
    static async apiGetArticles(req, res, next) {
        let page = parseInt(req.query.page, 10)-1
        let articlesPerPage = req.query.articlesPerPage ? parseInt(req.query.articlesPerPage) : 20
        let filters = {}
        if (req.query.title) {
            filters.title = req.query.title
        }
        const { articlesList, totalNumArticles } = await articlesDAO.getArticles({ 
            filters,
            page,
            articlesPerPage
            })
        let response = {
            articles: articlesList,
            filters: filters,
            total_results: totalNumArticles,
        }
        res.json(response)
    }

    static async createArticle(req, res, next) {
        try {
            const token = req.header('auth-token')
            if (!token) return res.status(401).json({ error: 'Access Denied' })
            else {
                req.user = jwt.verify(token, process.env.TOKEN_SECRET)                
                if (req.user.permissions.admin) {
                    articlesDAO.createOne({
                        user: req.body.user_id,
                        name: req.body.name,
                        date: Date.now(),
                        title: req.body.title,
                        description: req.body.description,
                        content: req.body.content,
                        ...(req.file && { key: req.file.key })
                    })
                    res.json({ status: 'Your article has been posted' })
                } else {
                    return res.status(401).json({ error: 'You do not have the permission to do this action' })
                }
            }
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async editArticle(req, res, next) {
        try {      
            const token = req.header('auth-token')
            if (!token) return res.status(401).json({ error: 'Access Denied' })
            else {
                req.user = jwt.verify(token, process.env.TOKEN_SECRET)
                if (req.user.permissions.admin) {
                    articlesDAO.editOne(req.body.article_title, { content: req.body.content, 
                        title: req.body.title, 
                        description: req.body.description })
                    res.json({ status: `The article "${req.body.article_title}" has been edited` })
                } else {
                    return res.status(401).json({ error: 'Access Denied' })
                }
            }
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async deleteArticle(req, res, next) {
        try {      
            const token = req.header('auth-token')
            if (!token) return res.status(401).json({ error: 'Access Denied' })
            else {
                req.user = jwt.verify(token, process.env.TOKEN_SECRET)
                if (req.user.permissions.admin) {
                    articlesDAO.deleteOne(req.body.title)
                    res.json({ status: `The article "${req.body.title}" has been deleted` })
                } else { 
                    return res.status(401).json({ error: 'Access Denied' })
                }
            }
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    }
}

