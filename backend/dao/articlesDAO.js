import mongodb from "mongodb"
import { unlinkSync } from "fs"

const ObjectId = mongodb.ObjectID
let articles

export default class articlesDAO {
    static async injectDB(conn) {
        if (articles) return
        try {
            articles = await conn.db(process.env.DB).collection("articles")
        } catch (e) {
            console.error(`Unable to establish collection handles in articlesDAO: ${e}`)
        }
    }

    static async getArticles({
        filters = null,
        articlesPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = {title: { $eq: filters["title"] }}
            }
        }
        let cursor
        try {
            cursor = await articles.find(query).sort({ date: -1 })
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { articlesList: [], totalNumArticles: 0 }
        }
        const displayCursor = cursor.limit(articlesPerPage)
        try {
            const articlesList = await displayCursor.toArray()
            const totalNumArticles = await articles.countDocuments(query)
            return { articlesList, totalNumArticles }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { articlesList, totalNumArticles }
        }
    }

    static async editOne(article_title, 
        {
            content=null,
            description=null, 
            title=null 
        } = {}) {
        try {
            return await articles.updateOne({ title: article_title }, {
                $set: {
                    ...(content && { content: content}),
                    ...(title && { title: title}),
                    ...(description && { description: description })
                }
            })
        } catch(e) {
            console.error(`Unable to find article: ${e}`)
            return { error: e }
        }
    }

    static async deleteOne(title) {
        try {
            // Remove article image from storage
            let article = await articles.findOne({ title: title })
            unlinkSync(article.img, (err) => console.error(err))

            // Delete article
            return await articles.deleteOne({ title: title })
        } catch(e) {
            console.error(`Unable to find article: ${e}`)
            return { error: e }
        }
    }

    static async createOne(article) {
        try {
            return await articles.insertOne(article)
        } catch (e) {
            console.error(`Unable to create article: ${e}`)
            return { error: e }
        }
    }
}

