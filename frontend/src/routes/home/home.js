import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import '../../styles/home.css'

export default function Home() {

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
    </div>
  )
}
