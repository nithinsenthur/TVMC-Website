import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { useArticles } from '../../services/articles.service'
import LatestNewsPanel from './LatestNewsPanel'
import '../../styles/home.css'

export default function Home() {

  const [articles, setArticles] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { retrieve } = useArticles()

  useEffect(() => {
    retrieve({ articlesPerPage: 4 })
      .then(res => {
        setArticles(res.articles)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <div className="home-page">
        <div className="home-page-inner">
          <div className="main">
            <motion.div
              className="message"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FontAwesomeIcon icon={faCogs} /> This site is currently under construction.
              <div className="message-description">
                Please check back soon.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="latest-news-container">
        {!isLoading 
          &&
          articles.map((article, i) => {
            return <LatestNewsPanel 
              key={article._id}
              title={article.title}
              description={article.description}
              img={article.img}
            />
          })
        }
      </div>
    </div>
  )
}


