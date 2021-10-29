import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Alert } from '../../components/global'
import { Link } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"
import { useAuth } from '../../services/users.service'
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
        >
            <div className="main">
                {error && <Alert message={error} />}
                <div className="auth-form">
                    <h1><FontAwesomeIcon icon={faClipboardCheck} /> Log In</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label for="email">Email </label>
                            <input
                                type="text"
                                id="email"
                                ref={email}
                                required
                            />
                        </div>
                        <div>
                            <label for="password">Password </label>
                            <input
                                type="password"
                                id="password"
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
                        <ReCAPTCHA
                            onChange={e => setResponseKey(e)}
                            sitekey="6Lfpes4bAAAAAE97BklqZovcb6tMGAzEig69LOD4"
                        />
                    </form>
                    <div>
                        Don't have an account? <Link to="/register">Register.</Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
