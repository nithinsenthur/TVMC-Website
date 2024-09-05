import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Alert } from '../../components/Global'
import { Link } from 'react-router-dom'
import { useAuth } from '../../services/UsersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../styles/auth.css'

export default function LogIn() {

    const { login } = useAuth()
    const email = useRef()
    const password = useRef()
    const [error, setError] = useState()
    const [responseKey, setResponseKey] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        await login({
            email: email.current.value,
            password: password.current.value,
            responseKey: responseKey
        },
            setError)
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
                        <h1>
                            <FontAwesomeIcon icon={faClipboardCheck} /> Log In
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
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="password">
                                        Password
                                    </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        ref={password}
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
                                    Login
                                </motion.button>
                            </div>
                        </form>
                        <div>
                            Not registered yet? <Link to="/register">Create an account</Link> or <Link to="/forgot-password">Reset your password</Link>.
                        </div>
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
