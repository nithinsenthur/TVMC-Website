import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Alert, Success } from '../../components/global'
import { useArticles } from '../../services/articles.service'
import { useParams, useHistory } from 'react-router-dom'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DeleteArticle() {

    const { remove } = useArticles()
    const history = useHistory()
    const { article_title } = useParams()
    const [error, setError] = useState()
    const [response, setResponse] = useState()

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await remove(article_title)
        if (res.error) {
            setError(res.error)
        } else {
            setError('')
            setResponse(res.status)
            history.push("/news");
        }
    }

    return (
        <div className="main">
            {error && <Alert message={error} />}
            {response && <Success message={response} />}
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
            >
                <div className="article-form">
                    <h1>Delete Article</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            Are you sure you want to delete this article? This is irreversible.
                        </div>
                        <div>
                            <motion.button
                                className="form-button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FontAwesomeIcon icon={faTimes} /> Delete
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

