import React from 'react'
import { motion } from 'framer-motion'
import { Link, useRouteMatch } from 'react-router-dom'
import { site_url } from '../../config.json'

export default function Panel({ delayTime, img, description, date, title }) {

    const { url } = useRouteMatch()

    return (
        <motion.div
            className="card"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.1 * delayTime }}
        >
            {img && <img src={`${site_url}/${img}`} />}
            <div className="card-info">
                <h3>
                    <Link to={`${url}/${title}`}>{title}</Link>
                </h3>
                <div className="description">
                    <italic>{new Date(date).toLocaleDateString()}</italic> - {description}
                </div>
            </div>
        </motion.div>
    )
}

