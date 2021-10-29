import React, { useState, useEffect } from 'react'
import { Loading } from '../../components/global'
import { Link } from 'react-router-dom'
import { useAuth } from '../../services/users.service'
import { useArticles } from '../../services/articles.service'
import { faPlusSquare, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Panel from './panel'
import '../../styles/articles.css'

export default function NewsIndex({ query }) {

    const { retrieve } = useArticles()
    const { isAdmin } = useAuth()
    const [articles, setArticles] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        retrieve(query)
            .then(res => {
                setArticles(res.articles)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <div className="news-banner">
                <FontAwesomeIcon icon={faGlobe} /> Latest News
                <form className="search-bar">
                    <input type="text" placeholder="Search.." name="search"></input>
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
            <div className="main">
                {isAdmin() && <Link className="button" to="/news/create"><FontAwesomeIcon icon={faPlusSquare} /> New Article</Link>}
                {isLoading ?
                    <Loading />
                    :
                    <div className="articles-container">
                        {articles.map((article, i) => {
                            return <Panel key={article._id}
                                title={article.title}
                                date={article.date}
                                description={article.description}
                                img={article.img}
                                author={article.name}
                                delayTime={i}
                            />
                        })}
                    </div>
                }
            </div>
        </div>
    )
}
