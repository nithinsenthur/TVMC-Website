import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Success, Alert } from '../../components/Global'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useArticles } from '../../services/ArticlesService'
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"

export default function CreateArticle() {

    const { quill, quillRef } = useQuill()

    const { post } = useArticles()
    const [description, setDescription] = useState()
    const [title, setTitle] = useState()
    const [img, setImg] = useState()
    const [error, setError] = useState()
    const [response, setResponse] = useState()

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await post(title, description, quillRef, img)
        if (res.error) {
            setError(res.error)
        } else {
            setError('')
            setResponse(res.status)
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
                    <h1>Post Article</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label for="title">Title </label>
                            <input type="text" id="title" onChange={({ target }) => setTitle(target.value)} required />
                        </div>
                        <div>
                            <label for="description">Description </label>
                            <input type="text" id="description" onChange={({ target }) => setDescription(target.value)} required />
                        </div>
                        <div>
                            <div ref={quillRef} />
                        </div>
                        <div>
                            <label for="img">Select image </label>
                            <input type="file" id="img" name="img" accept="image/*" onChange={({ target }) => setImg(target.files[0])} />
                        </div>
                        <motion.button
                            className="form-button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Post
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

