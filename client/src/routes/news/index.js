import React, { useState, useEffect } from 'react'
import { Loading } from '../../components/Global'
import { Link } from 'react-router-dom'
import { useAuth } from '../../services/UsersService'
import { useHistory } from 'react-router'
import { useArticles } from '../../services/ArticlesService'
import { faPlusSquare, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Panel from './panel'
import '../../styles/articles.css'

export default function NewsIndex({ title, page }) {

    const { retrieve } = useArticles()
    const { isAdmin } = useAuth()
    const history = useHistory()
    const [articles, setArticles] = useState([])
    const [pageNumbers, setPageNumbers] = useState()
    const [isLoading, setLoading] = useState(true)

    // // adjust style of Material UI pagination component
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         "& > *": {
    //             marginTop: theme.spacing(2),
    //             justifyContent: "center",
    //             display: 'flex'
    //         }
    //     }
    // }))
    // const classes = useStyles()

    // Retrieve articles for current page
    useEffect(() => {
        retrieve({ title, page })
            .then(res => {
                setArticles(res.articles)
                setPageNumbers(Math.ceil(res.total_results / 20))
                setLoading(false)
            })
    }, [])

    return (
        <div className="main">
            <div
                className="primary"
            >
                <h1><FontAwesomeIcon icon={faGlobe} /> Latest News & Content</h1>
            </div>
            {isAdmin() && <Link className="button" to="/news/create"><FontAwesomeIcon icon={faPlusSquare} /> New Article</Link>}
            {isLoading ?
                <Loading />
                :
                <div className="articles-container">
                    {
                        articles.map((article, i) => {
                            return <Panel key={article._id}
                                title={article.title}
                                date={article.date}
                                description={article.description}
                                img={article.img}
                                author={article.name}
                                delayTime={i}
                            />
                        })
                    }
                </div>
            }
            {/* <div className="pagination">
                <Pagination
                    className={classes.root}
                    page={page}
                    count={pageNumbers}
                    onChange={(e, page) => {
                        history.push(`news?page=${page}`)
                        history.go(0)
                    }}
                    size="large"
                />
            </div> */}
        </div>
    )
}