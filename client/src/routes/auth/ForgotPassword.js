import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Alert, Success } from '../../components/Global'
import { Link } from 'react-router-dom'
import { useAuth } from '../../services/UsersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlasses, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../styles/auth.css'

export default function ForgotPassword() {

    const { forgotPassword } = useAuth()
    const email = useRef()
    const [error, setError] = useState()
    const [response, setResponse] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        await forgotPassword(email.current.value)
            .then(res => {
                if(res.error) {
                    setError(res.error)
                } else {
                    setResponse(res.status)
                }
            })
    }

    return (
        <div className="auth-container">
            <div className="left">
                <Link to="/">
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="exit"
                    />
                </Link>
                <div className="tds-login-form-wrapper">
                    <div className="tds-form">
                        {error && <Alert message={error} />}
                        {response && <Success message={response} />}
                        <h1>
                            <FontAwesomeIcon icon={faGlasses} /> Forgot Password
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="email">
                                        Email
                                    </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="email"
                                        placeholder="myemail@website.com"
                                        id="email"
                                        ref={email}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="form-button"
                                >
                                    Send Link
                                </motion.button>
                            </div>
                        </form>
                        <div className="copyright">
                            © {new Date().getFullYear()} TVMC Alumni Association of North America
                        </div>
                    </div>
                </div>
            </div>
            <div className="right" />
        </div>
    )
}
