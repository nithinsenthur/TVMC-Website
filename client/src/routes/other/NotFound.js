import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
    return (
        <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="main">
            <div
                className="primary"
            >
                <h1><FontAwesomeIcon icon={faTimesCircle} /> 404. Page Not Found</h1>
                Sorry, the page you were looking for was not found.
            </div>
        </motion.div>
    )
}
