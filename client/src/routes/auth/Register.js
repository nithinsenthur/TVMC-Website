import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Alert, Success } from '../../components/Global'
import { useAuth } from '../../services/UsersService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTimes } from '@fortawesome/free-solid-svg-icons'
import '../../styles/auth.css'

export default function Register() {

    const history = useHistory()
    const { register, setToken } = useAuth()
    const [error, setError] = useState()
    const [response, setResponse] = useState()

    const username = useRef()
    const password = useRef()
    const email = useRef()
    const classYear = useRef()
    const institution = useRef()
    const countryCode = useRef()
    const phone = useRef()
    const role = useRef()
    const state = useRef()
    const city = useRef()
    const street = useRef()
    const zipcode = useRef()
    const specialty = useRef()
    const country = useRef()
    const [interests, setInterests] = useState([])

    const handleCheckboxOnChange = ({ target }) => {
        if (interests.includes(target.value)) {
            setInterests(interests.filter(interest => interest !== target.value))
        } else {
            interests.push(target.value)
        }
    }

    useEffect(() => {
        let height = document.querySelector(".left").offsetHeight
        let right = document.querySelector(".right")
        right.style.height = `calc(20vh + ${height}px)`
    }, [])

    // API call to register user
    const handleSubmit = async e => {
        e.preventDefault()
        await register({
            email: email.current.value,
            name: username.current.value,
            password: password.current.value,
            ...(classYear.current.value && { class: classYear.current.value }),
            phone: countryCode.current.value + phone.current.value,
            role: role.current.value,
            specialty: specialty.current.value,
            institution: institution.current.value,
            interests: interests,
            address: {
                city: city.current.value,
                state: state.current.value,
                zipcode: zipcode.current.value,
                country: country.current.value,
                ...(street.current.value && { street: street.current.value })
            }
        }).then(res => {
            if (res.error) {
                setError(res.error)
            } else {
                setResponse(res.status)
                setToken(res.token)
                localStorage.setItem('token', res.token)
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
                <div className="tds-register-form-wrapper">
                    <div className="tds-form">
                        {error && <Alert message={error} />}
                        {response && <Success message={response} />}
                        <h1><FontAwesomeIcon icon={faList} /> Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="email">E-mail </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="email"
                                        id="email"
                                        ref={email}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="username">Name </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <div className="tds-form-input-wrap">
                                        <input
                                            type="text"
                                            id="username"
                                            ref={username}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="password">Password </label>
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
                                    <label for="class">Batch / Starting Year </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="number"
                                        id="class"
                                        ref={classYear}
                                    />
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="role">Role </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <select id="role" ref={role}>
                                        <option value="Student">Student</option>
                                        <option value="Physician">Physician</option>
                                        <option value="Trainee">Trainee</option>
                                        <option value="Guest">Guest</option>
                                    </select>
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="specialty">Specialty </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <select id="specialty" ref={specialty}>
                                        <option value="Anesthesiology">Anesthesiology</option>
                                        <option value="Dermatology">Dermatology</option>
                                        <option value="Radiology">Radiology</option>
                                        <option value="Emergency medicine">Emergency medicine</option>
                                        <option value="Family medicine">Family medicine</option>
                                        <option value="Internal medicine">Internal medicine</option>
                                        <option value="Neurology">Neurology</option>
                                        <option value="Nuclear medicine">Nuclear medicine</option>
                                        <option value="Obstetrics and gynecology">Obstetrics and gynecology</option>
                                        <option value="Sports Medicine">Sports Medicine</option>
                                        <option value="Ophthalmology">Ophthalmology</option>
                                        <option value="Pathology">Pathology</option>
                                        <option value="Pediatrics">Pediatrics</option>
                                        <option value="Physical medicine and rehabilitation">Physical medicine and rehabilitation</option>
                                        <option value="Preventive medicine">Preventive medicine</option>
                                        <option value="Psychiatry">Psychiatry</option>
                                        <option value="Radiation oncology">Radiation oncology</option>
                                        <option value="Medical oncology">Medical oncology</option>
                                        <option value="Nephrology">Nephrology</option>
                                        <option value="Endocrinology">Endocrinology</option>
                                        <option value="Pulmonology">Pulmonology</option>
                                        <option value="Rheumatology">Rheumatology</option>
                                        <option value="Gastroenterology">Gastroenterology</option>
                                        <option value="Hematology">Hematology</option>
                                        <option value="Infectious disease">Infectious disease</option>
                                        <option value="Intensive Care Medicine">Intensive Care Medicine</option>
                                        <option value="General (Surgery)">General (Surgery)</option>
                                        <option value="Gastroenterology (Surgery)">Gastroenterology (Surgery)</option>
                                        <option value="Neurosurgery (Surgery)">Neurosurgery (Surgery)</option>
                                        <option value="Orthopedics (Surgery)">Orthopedics (Surgery)</option>
                                        <option value="Urology (Surgery)">Urology (Surgery)</option>
                                        <option value="Hepatobiliary (Surgery)">Hepatobiliary (Surgery)</option>
                                        <option value="Colorectal (Surgery)">Colorectal (Surgery)</option>
                                        <option value="Vascular (Surgery)">Vascular (Surgery)</option>
                                        <option value="Head and Neck (Surgery)">Head and Neck (Surgery)</option>
                                        <option value="Cardiothoracic (Surgery)">Cardiothoracic (Surgery)</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Interventional Cardiology">Interventional Cardiology</option>
                                        <option value="Interventional Radiology">Interventional Radiology</option>
                                        <option value="Other" selected>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="username">Institution </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <div className="tds-form-input-wrap">
                                        <input
                                            type="text"
                                            id="institution"
                                            ref={institution}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="country-code">Country Code </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <select id="country-code" ref={countryCode}>
                                        <option value="1">+1 (United States)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="phone">Phone </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="1112223333"
                                        ref={phone}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="street">Work Address </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="text"
                                        id="street"
                                        ref={street}
                                    />
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="city">City </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <input
                                        type="text"
                                        id="city"
                                        ref={city}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="state">State </label>
                                </div>
                                <div className="tds-form-input-wrap">
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
                                        <option value="OT">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="zipcode">Zip Code </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                <input
                                    type="number"
                                    id="zipcode"
                                    ref={zipcode}
                                    required
                                />
                                </div>
                            </div>
                            <div className="tds-form-item">
                                <div className="tds-form-label-wrap">
                                    <label for="role">Country </label>
                                </div>
                                <div className="tds-form-input-wrap">
                                    <select id="role" ref={country}>
                                        <option value="United States of America">United States of America</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                            </div>
                            Interests
                            <div className="checkbox tds-form-item">
                                <div>
                                    <input type="checkbox" id="Teaching" value="Teaching" onChange={handleCheckboxOnChange} />
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
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Sign up
                                </motion.button>
                            </div>
                        </form>
                        <div>
                            Already have an account? <Link to="/login">Log in.</Link>
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
