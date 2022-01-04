import React, { useState, useEffect } from 'react'
import { Loading } from '../../components/global'
import { Link } from 'react-router-dom'
import { useAuth } from '../../services/users.service'
import { useHistory } from 'react-router'
import { useArticles } from '../../services/articles.service'
import { faPlusSquare, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagination from '@mui/material/Pagination'
import Panel from './panel'
import '../../styles/articles.css'

export default function NewsIndex({ title, page }) {

    const { retrieve } = useArticles()
    const { isAdmin } = useAuth()
    const history = useHistory()
    const [articles, setArticles] = useState([])
    const [pageNumbers, setPageNumbers] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        retrieve({ title, page })
            .then(res => {
                setArticles(res.articles)
                setPageNumbers(Math.ceil(res.total_results/20))
                setLoading(false)
            })
    }, [])

    return (
        <div className="main">
            <h1><FontAwesomeIcon icon={faGlobe} /> News</h1>
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
            <Pagination 
                page={page}
                count={pageNumbers} 
                onChange={(e, page) => {
                    history.push(`news?page=${page}`)
                    history.go(0)
                }}
                size="large" />
        </div>
    )
}