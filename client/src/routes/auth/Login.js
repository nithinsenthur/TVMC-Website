import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Alert } from '../../components/Global'
import { Link } from 'react-router-dom'
import { useAuth } from '../../services/UsersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
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
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="auth-container"
        >
            <div className="left">
                {error && <Alert message={error} />}
                <div className="auth-form">
                    <h1><FontAwesomeIcon icon={faClipboardCheck} /> Log In</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="E-mail"
                                id="email"
                                ref={email}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                ref={password}
                                required
                            />
                        </div>
                        <div>
                            <motion.button
                                className="form-button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Login
                            </motion.button>
                        </div>
                    </form>
                    <div>
                        Don't have an account? <Link to="/register">Register.</Link>
                    </div>
                </div>
            </div>
            <div className="right" />
        </motion.div>
    )
}
