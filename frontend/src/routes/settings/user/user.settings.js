import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Alert, Success } from '../../../components/Global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../../services/UsersService'
import { useQuill } from "react-quilljs"
import { Link } from 'react-router-dom'
import '../../../styles/settings.css'

export default function UserSettings() {

    const { edit, getID } = useAuth()

    const description = useRef()
    const password = useRef()
    const passwordConfirmation = useRef()
    const email = useRef()
    const emailConfirmation = useRef()
    const phone = useRef()
    const state = useRef()
    const city = useRef()
    const street = useRef()
    const zipcode = useRef()

    const [error, setError] = useState()
    const [response, setResponse] = useState()

    const { quill, quillRef } = useQuill()

    useEffect(() => {
        document.title = "User Settings"
        let height = document.querySelector(".left").offsetHeight
        let right = document.querySelector(".right")
        right.style.height = `calc(20vh + ${height}px)`
    }, [])

    const changeAddress = async e => {
        e.preventDefault()
        await edit(getID(), {
            address: {
                city: city.current.value,
                state: state.current.value,
                zipcode: zipcode.current.value,
                ...(street.current.value && { street: street.current.value })
            }
        })
            .then(res => {
                if (res.error) setError(res.error)
                else setResponse(res.status)
            })
    }

    const changePassword = async e => {
        e.preventDefault()
        if (password.current.value !== passwordConfirmation.current.value) {
            setError("Your passwords do not match.")
        } else {
            await edit(getID(), { password: password })
                .then(res => {
                    if (res.error) setError(res.error)
                    else setResponse(res.status)
                })
        }
    }

    const changeDescription = async e => {
        e.preventDefault()
        await edit(getID(), { description: quillRef.current.firstChild.innerHTML })
            .then(res => {
                if (res.error) setError(res.error)
                else setResponse(res.status)
            })
    }

    const changeEmail = async e => {
        e.preventDefault()
        if (email.current.value !== emailConfirmation.current.value) {
            setError("Your emails do not match.")
        } else {
            await edit(getID(), { email: email })
                .then(res => {
                    if (res.error) setError(res.error)
                    else setResponse(res.status)
                })
        }
    }

    const changePhone = async e => {
        e.preventDefault()
        await edit(getID(), { phone: phone.current.value })
            .then(res => {
                if (res.error) setError(res.error)
                else setResponse(res.status)
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
                <div className="tds-register-form-wrapper">
                    <div className="tds-form">
                        <h1><FontAwesomeIcon icon={faCog} /> User Settings</h1>
                        {error && <Alert message={error} />}
                        {response && <Success message={response} />}
                        <div className="auth-form">
                            <div>
                                <form onSubmit={changeEmail}>
                                    <div className="tds-form-item">
                                        <div className="tds-form-label-wrap">
                                            <label for="email">E-mail</label>
                                        </div>
                                        <div className="tds-form-input-wrap">
                                            <input type="email" ref={email} placeholder="Email..." required />
                                        </div>
                                        <div className="tds-form-input-wrap">
                                            <input type="email" ref={emailConfirmation} placeholder="Confirm Email..." required />
                                        </div>
                                        <motion.button
                                            className="form-button"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            Update E-mail
                                        </motion.button>
                                    </div>
                                </form>
                                <form onSubmit={changePassword}>
                                    <strong>Password</strong>
                                    <div>
                                        <input type="password" placeholder="Password..." ref={password} />
                                    </div>
                                    <div>
                                        <input type="password" placeholder="New Password..." ref={passwordConfirmation} />
                                    </div>
                                    <motion.button
                                        className="form-button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Update
                                    </motion.button>
                                </form>
                                <form onSubmit={changePhone}>
                                    <strong>Phone</strong>
                                    <div>
                                        <input type="text" ref={phone} placeholder="Phone..." required />
                                    </div>
                                    <motion.button
                                        className="form-button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Update
                                    </motion.button>
                                </form>
                                <form onSubmit={changeAddress}>
                                    <strong>Address</strong>
                                    <div>
                                        <label for="street">Street </label>
                                        <input
                                            type="text"
                                            id="street"
                                            ref={street}
                                        />
                                    </div>
                                    <div>
                                        <label for="city">City </label>
                                        <input
                                            type="text"
                                            id="city"
                                            ref={city}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label for="state">State </label>
                                        <select id="state" ref={state}>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="DC">District Of Columbia</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="zipcode">Zip Code </label>
                                        <input
                                            type="number"
                                            id="zipcode"
                                            ref={zipcode}
                                            required
                                        />
                                    </div>
                                    <motion.button
                                        className="form-button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Update
                                    </motion.button>
                                </form>
                                <form onSubmit={changeDescription}>
                                    <strong>Profile Description</strong>
                                    <div>
                                        <div ref={quillRef} />
                                    </div>
                                    <motion.button
                                        className="form-button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Update
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right" />
        </div>
    )
}
