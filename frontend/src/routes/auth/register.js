import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'
import { Alert, Success } from '../../components/global'
import ReCAPTCHA from "react-google-recaptcha"
import { useAuth } from '../../services/users.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import '../../styles/auth.css'

export default function Register() {

    const { register } = useAuth()
    const history = useHistory()

    const username = useRef()
    const password = useRef()
    const email = useRef()
    const classYear = useRef()
    const phone = useRef()
    const role = useRef()
    const state = useRef()
    const city = useRef()
    const street = useRef()
    const zipcode = useRef()
    const specialty = useRef()
    const [interests, setInterests] = useState([])

    const [error, setError] = useState()
    const [response, setResponse] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        await register({
                email: email.current.value,
                name: username.current.value,
                password: password.current.value,
                ...(classYear.current.value && { class: classYear.current.value }),
                phone: phone.current.value,
                role: role.current.value,
                specialty: specialty.current.value,
                interests: interests,
                address: {
                    city: city.current.value,
                    state: state.current.value,
                    zipcode: zipcode.current.value,
                    ...(street.current.value && { street: street.current.value })
                }
        },
            setError,
            setResponse)
        if (response) history.push('/login')
    }
    
    const handleCheckboxOnChange = ({ target }) => {
        if (interests.includes(target.value)) {
            setInterests(interests.filter(interest => interest !== target.value))
        } else {
            interests.push(target.value)
        }
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
                    <div className="center">
                        <h1><FontAwesomeIcon icon={faList} /> Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label for="email">E-mail </label>
                                <input
                                    type="email"
                                    id="email"
                                    ref={email}
                                    required
                                />
                            </div>
                            <div>
                                <label for="username">Name </label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={username}
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
                                <label for="class">Class </label>
                                <input
                                    type="number"
                                    id="class"
                                    ref={classYear}
                                />
                            </div>
                            <div>
                                <label for="role">Role </label>
                                <select id="role" ref={role}>
                                    <option value="Student">Student</option>
                                    <option value="Physician">Physician</option>
                                    <option value="Trainee">Trainee</option>
                                    <option value="Guest">Guest</option>
                                </select>
                            </div>
                            <div>
                                <label for="specialty">Specialty </label>
                                <select id="specialty" ref={specialty}>
                                    <option value="Placeholder1">Placeholder1</option>
                                    <option value="Placeholder2">Placeholder2</option>
                                    <option value="Placeholder3">Placeholder3</option>
                                    <option value="Placeholder4">Placeholder4</option>
                                    <option value="Placeholder5">Placeholder5</option>
                                </select>
                            </div>
                            <div>
                                <label for="phone">Phone </label>
                                <input
                                    type="text"
                                    id="phone"
                                    ref={phone}
                                    required
                                />
                            </div>
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
                            Interests
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox" id="Teaching" value="Teaching" onChange={handleCheckboxOnChange}/>
                                    <label for="Teaching"> Teaching</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="Research" value="Research" onChange={handleCheckboxOnChange} />
                                    <label for="Research"> Research</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="Career Guidance" value="Career Guidance" onChange={handleCheckboxOnChange} />
                                    <label for="Career Guidance"> Career Guidance</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="Charity and Social Work" value="Charity and Social Work" onChange={handleCheckboxOnChange} />
                                    <label for="Charity and Social Work"> Charity and Social Work</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="Organizing Events" value="Organizing Events" onChange={handleCheckboxOnChange} />
                                    <label for="Organizing Events"> Organizing Events</label>
                                </div>
                            </div>
                            <div>
                                <motion.button
                                    className="form-button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Sign up
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div >
    )
}
