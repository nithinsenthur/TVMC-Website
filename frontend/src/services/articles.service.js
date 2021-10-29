import jwt_decode from 'jwt-decode'

export const useArticles = () => {
    return {
        retrieve: async (title = null) => {
            let query = 'http://localhost:5000/api/articles/'
            if (title) {
                query += `?title=${title}`
            }
            return await fetch(query)
                .then(response => response.json())
        },
        post: async (title, description, content, img) => {
            const token = localStorage.getItem('token')
            const user = jwt_decode(token)

            let articleData = new FormData()
            articleData.append('user_id', user._id)
            articleData.append('name', user.name)
            articleData.append('title', title)
            articleData.append('description', description)
            articleData.append('content', content)
            articleData.append('img', img)

            return await fetch('http://localhost:5000/api/articles/create', {
                method: 'POST',
                body: articleData,
                headers: {
                    'auth-token': token
                }
            }).then(response => response.json())
        },
        remove: async (title) => {
            const token = localStorage.getItem('token')
            return await fetch('http://localhost:5000/api/articles/delete', {
                method: 'DELETE',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title
                })
            }).then(response => response.json())
        },
        edit: async (article_title, content = null, title = null, description = null) => {
            const token = localStorage.getItem('token')
            return await fetch('http://localhost:5000/api/articles/edit', {
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
    }
}
