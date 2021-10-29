import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Markup } from 'interweave'
import { Alert, Loading } from '../../components/global'
import { useArticles } from '../../services/articles.service'
import { useAuth } from '../../services/users.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default function Article() {

    const { retrieve } = useArticles()
    const { isAdmin } = useAuth()
    const { title } = useParams()
    const [article, setArticle] = useState([])
    const [error, setError] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        retrieve(title)
            .then(res => {
                if (res.articles[0]) {
                    setArticle(res.articles[0])
                } else {
                    setError("Article not found")
                }
                setArticle(res.articles[0])
                setLoading(false)
            })
    }, [])

    return (
        <div className="main">
            {isLoading
                ?
                <Loading />
                : error
                    ?
                    <Alert message={error} />
                    :
                    <div>
                        {isAdmin() && <Link className="button" to={`/news/edit/${title}`}><FontAwesomeIcon icon={faPlusSquare} /> Edit Article</Link>}
                        {isAdmin() && <Link className="button-red" to={`/news/delete/${title}`}><FontAwesomeIcon icon={faTimesCircle} /> Delete Article</Link>}
                        <div className="article-wrapper">
                            <motion.div
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                            >
                                <Link to="/news">News</Link>
                                <h1 className="article-title">{article.title}</h1>
                                <p className="article-description">{article.description}</p>
                                {article.img && <img className="article-photo" alt="" src={`http://localhost:5000/${article.img}`}></img>}
                                <div className="article-header">
                                    <div>By <strong><Link to={`members/${article.name}`}>{article.name}</Link></strong></div>
                                    <div>{new Date(article.date).toUTCString()}</div>
                                </div>
                                <hr />
                                <div className="article-content">
                                    <Markup content={article.content} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
            }
        </div>
    )
}
