import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import HomeHeader from './home.header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import '../../styles/home.css'

export default function Home() {

  // Fix home header on scroll, replace with regular header after user leaves home
  useEffect(() => {
    const onScrollHeader = document.getElementById("header")
    const header = document.getElementById("home-header")

    onScrollHeader.style.display="none"
    onScrollHeader.style.position="fixed"
    const onScroll = () => {
      if (window.pageYOffset > header.offsetTop) {
        header.style.display = "none"
        onScrollHeader.style.display = "flex"
      } else {
        header.style.display = "flex"
        onScrollHeader.style.display = "none"
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => {
      onScrollHeader.style.display="flex"
      onScrollHeader.style.position="sticky"
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div>
      <HomeHeader />
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
    </div>
  )
}
