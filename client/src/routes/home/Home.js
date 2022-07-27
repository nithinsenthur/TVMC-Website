import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { useArticles } from '../../services/ArticlesService'
import Layout from '../../components/Layout'
import LatestNewsPanel from './LatestNewsPanel'
import '../../styles/Home.css'

export default function Home() {

  const [articles, setArticles] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { retrieve } = useArticles()

  let image = 1
  useEffect(() => {
    document.title = "TVMC Medical College Alumni Association of North America"
    retrieve({ articlesPerPage: 4 })
      .then(res => {
        setArticles(res.articles)
        setLoading(false)
      })
    
    let interval = setInterval(() => {
      let homepage = document.getElementsByClassName('home-page')[0]
      homepage.style.backgroundImage = `url("${image}.jpg")`
      image = (image + 1) % 6
    }, 4000)
  }, [])

  return (
    <Layout>
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
              img={article.key}
            />
          })
        }
      </div>
    </Layout>
  )
}


