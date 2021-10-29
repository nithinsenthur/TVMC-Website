import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'

const Success = ({ message }) => {
    return (
        <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
        >
            <div class="success-message">
                <FontAwesomeIcon icon={faCheckCircle} /> <strong>Success!</strong> {message}
            </div>
        </motion.div>
    )
}

const Alert = ({ message }) => {
    return (
        <motion.div
            initial={{ x: -20 }}
            animate={{ x: [0, 20, -20, 0] }}
            transition={{ duration: 0.2 }}
        >
            <div class="alert-message">
                <FontAwesomeIcon icon={faTimesCircle} /> <strong>Error.</strong> {message}
            </div>
        </motion.div>
    )
}

const Loading = () => {
    return (
        <div className="loading-text"><FontAwesomeIcon icon={faSpinner} /></div>
    )
}

const Avatar = ({ url }) => {
    return(
        <img className="member-avatar" alt="" src={url}></img>
    )
}

export { Alert, Success, Loading, Avatar }

