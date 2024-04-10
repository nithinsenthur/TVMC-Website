import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Alert, Success } from '../../components/Global'
import { useAuth } from '../../services/UsersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import '../../styles/auth.css'

export default function Verify() {

    const history = useHistory()
    const { setToken, verify } = useAuth()
    const PhoneNumberVerificationCode = useRef()
    const [error, setError] = useState()
    const [response, setResponse] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        verify(PhoneNumberVerificationCode.current.value)
            .then(res => {
                if(res.error) {
                    setError(res.error);
                }
                if(res.status) {
                    setToken(res.token)
                    setResponse("You have been verified")
                    localStorage.setItem('token', res.token)
                    setTimeout(() => { 
                        history.push('/')
                        history.go(0)
                    }, 2000)
                }
            })
    }

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <div className="main">
                {error && <Alert message={error} />}
                {response && <Success message={response} />}
                <div className="auth-form">
                    <h1><FontAwesomeIcon icon={faClipboardCheck} /> Verify Phone Number</h1>
                    <form onSubmit={handleSubmit}>
                      <div>
                          <label for="PhoneNumberVerificationCode">Verification Code </label>
                            <input
                              type="number"
                              id="PhoneNumberVerificationCode"
                              ref={PhoneNumberVerificationCode}
                          />
                        </div>
                        <div>
                            <motion.button
                                className="form-button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Verify
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}
