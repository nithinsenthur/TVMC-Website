import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Markup } from 'interweave'
import { Loading } from '../../components/Global'
import { useArticles } from '../../services/ArticlesService'
import { useAuth } from '../../services/UsersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons"
import NotFound from '../other/NotFound'
import { assetsUrl } from '../../config.json'

export default function Article() {

    const { retrieve } = useArticles()
    const { isAdmin } = useAuth()
    const { title } = useParams()
    const [article, setArticle] = useState([])
    const [error, setError] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        document.title = title;
        retrieve({ title })
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
        <div>
            {isLoading
                ?
                <Loading />
                : error
                    ?
                    <NotFound />
                    :
                    <div className="article-wrapper">
                        <motion.div
                            initial={{ y: -100 }}
                            animate={{ y: 0 }}
                        >
                            <div className="banner">
                                {<div className="article-photo"
                                        style={{
                                            backgroundImage:
                                                `linear-gradient(to bottom, 
                                                                rgba(255,255,255,0) 0%, 
                                                                rgba(0,0,0,0.5) 40%, 
                                                                rgba(0,0,0,0.6) 100%),
                                            url(${assetsUrl}/${article.key})`
                                        }}
                                    />
                                }
                                <div className="article-header">
                                    <h1 className="article-title">{article.title}</h1>
                                    <p className="article-info">
                                        {new Date(article.date).toDateString()} | By <strong><Link to={`/members/${article.name}`}>{article.name}</Link></strong>
                                    </p>
                                    <div className="article-social-media-buttons">
                                        <ul>
                                            <li><FontAwesomeIcon icon={faFacebookF} /></li>
                                            <li><FontAwesomeIcon icon={faLinkedinIn} /></li>
                                            <li><FontAwesomeIcon icon={faTwitter} /></li>
                                            <li><FontAwesomeIcon icon={faEnvelope} /></li>
                                        </ul>
                                    </div>
                                    <p className="article-description">{article.description}</p>
                                </div>
                            </div>
                            <div className="main">
                                {isAdmin() && <Link className="button" to={`/news/edit/${title}`}><FontAwesomeIcon icon={faPlusSquare} /> Edit Article</Link>}
                                {isAdmin() && <Link className="button-red" to={`/news/delete/${title}`}><FontAwesomeIcon icon={faTimesCircle} /> Delete Article</Link>}
                                <div className="article-body">
                                        <Markup content={article.content} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
            }
        </div>
    )
}
