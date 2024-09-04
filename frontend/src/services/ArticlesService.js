import React, { useContext } from "react"
import jwt_decode from 'jwt-decode'
import config from '../config.json'

const ArticleContext = React.createContext()

export const useArticles = () => {
    return useContext(ArticleContext)
}

export const ArticleProvider = ({ children }) => {

    let apiUrl = process.env.REACT_APP_API_URL
    let { assetsUrl } = config

    const retrieve = async ({
        title = null,
        page = null,
        articlesPerPage = null
    } = {}) => {
        let query = `${apiUrl}/api/articles/`
        if (title) {
            query += `?title=${title}`
        } else if (page) {
            query += `?page=${page}`
        } else if (articlesPerPage) {
            query += `?articlesPerPage=${articlesPerPage}`
        }
        return await fetch(query)
            .then(response => response.json())
    }

    const post = async (title, description, content, img) => {
        const token = localStorage.getItem('token')
        const user = jwt_decode(token)

        let articleData = new FormData()
        articleData.append('user_id', user._id)
        articleData.append('name', user.name)
        articleData.append('title', title)
        articleData.append('description', description)
        articleData.append('content', content)
        articleData.append('img', img)

        return await fetch(`${apiUrl}/api/articles/create`, {
            method: 'POST',
            body: articleData,
            headers: {
                'auth-token': token
            }
        }).then(response => response.json())
    }

    const remove = async (title) => {
        const token = localStorage.getItem('token')
        return await fetch(`${apiUrl}/api/articles/delete`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        }).then(response => response.json())
    }

    const edit = async (article_title, content = null, title = null, description = null) => {
        const token = localStorage.getItem('token')
        return await fetch(`${apiUrl}/api/articles/edit`, {
            method: 'PUT',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                article_title: article_title,
                content: content,
                title: title,
                description: description
            })
        }).then(response => response.json())
    }

    const value = {
        retrieve,
        post,
        remove,
        edit
    }

    return ( 
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    )
}


