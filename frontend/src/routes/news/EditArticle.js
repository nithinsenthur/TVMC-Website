import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useArticles } from '../../services/ArticlesService'
import { useParams, useHistory } from 'react-router-dom'
import { Success, Alert } from '../../components/Global'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"

export default function EditArticle() {
    
    const { quillRef } = useQuill()

    const { edit } = useArticles()
    const history = useHistory()
    const { article_title } = useParams()
    const [description, setDescription] = useState()
    const [title, setTitle] = useState()
    const [error, setError] = useState()
    const [response, setResponse] = useState()

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await edit(article_title, quillRef.current.firstChild.innerHTML, title, description)
        if (res.error) {
            setError(res.error)
        } else {
            setError('')
            setResponse(res.status)
            if (title) history.push(`/news/${title}`)
            else history.push(`/news/${article_title}`)
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
                    <h1>Edit Article</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label for="title">Title </label>
                            <input type="text" id="title" onChange={({ target }) => setTitle(target.value)} />
                        </div>
                        <div>
                            <label for="description">Description </label>
                            <input type="text" id="description" onChange={({ target }) => setDescription(target.value)} />
                        </div>
                        <div>
                            <div ref={quillRef} />
                        </div>
                        <motion.button
                            className="form-button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Edit
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

