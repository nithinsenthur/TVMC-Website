import React from 'react'
import { motion } from 'framer-motion'
import { Link, useRouteMatch } from 'react-router-dom'

export default function Panel({ delayTime, img, description, author, title }) {

    const { url } = useRouteMatch()

    return (
        <motion.div
            className="card"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.1 * delayTime }}
        >
            {img && <img src={`http://localhost:5000/${img}`} />}
            <div className="card-info">
                <h3>
                    <Link to={`${url}/${title}`}>{title}</Link>
                </h3>
                <div className="description">
                    {description}
                </div>
                <strong><Link to={`members/${author}`}>{author}</Link></strong>
            </div>
        </motion.div>
    )
}

