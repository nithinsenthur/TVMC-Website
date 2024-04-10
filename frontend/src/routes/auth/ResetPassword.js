import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'
import { Alert, Success } from '../../components/Global'
import { Link } from 'react-router-dom'
import { useAuth } from '../../services/UsersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlasses, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../styles/auth.css'

export default function ResetPassword() {

    const history = useHistory()
    const { resetPassword } = useAuth()
    const { token } = useParams()
    
    const password = useRef()
    const passwordConfirmation = useRef()

    const [error, setError] = useState()
    const [response, setResponse] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        if (password.current.value != passwordConfirmation.current.value) {
            setError("Passwords do not match")
            return
        }
        await resetPassword(token, password.current.value)
            .then(res => {
                if (res.error)
                    setError(res.error)
                else if (res.status)
                {
                    setResponse(res.status)
                    setTimeout(() => {
                        history.go(0)
                    }, 2000)
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
                            <FontAwesomeIcon icon={faGlasses} /> Reset Password
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="password">New Password </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="password"
                                        id="password"
                                        ref={password}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="password">Confirm New Password </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="password"
                                        id="password"
                                        ref={passwordConfirmation}
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
                                    Reset Password
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
