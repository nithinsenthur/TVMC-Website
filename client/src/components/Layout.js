import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faIdCard, faKey, faUserCircle, faCogs, faChartLine, faDoorClosed, faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../services/UsersService'

export default function Layout({ children }) {

    const { isLoggedIn, isVerified, isAdmin, getUsername } = useAuth()
    let history = useHistory()

    return (
        <div>
            <div className="page-container">
                <div className="header">
                    <div className="left">
                        <div className="logo-emblem">
                            <Link to="/">
                                <div className="emblem">
                                    <img src="/TVMC.png"></img>
                                </div>
                            </Link>
                        </div>
                        <div className="logo-text">
                            <Link to="/">TVMC Alumni Association of North America</Link>
                        </div>
                        <div className="nav">
                            <ul>
                                {isVerified() && <li><Link to="/members">Members</Link></li>}
                                <li><Link to="/about"> About</Link></li>
                                <li><Link to="/news">News</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        {isLoggedIn()
                            ?
                            <div className="dropdown">
                                <div id="icon">
                                    <FontAwesomeIcon icon={faUserCircle} /> {getUsername()} <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                                <div className="dropdown-content">
                                    <Link to="/logout"><FontAwesomeIcon icon={faDoorClosed} /> Log Out</Link>
                                    <Link to="/settings"><FontAwesomeIcon icon={faCogs} /> Settings</Link>
                                    {isVerified() && <Link to={`/members/${getUsername()}`}><FontAwesomeIcon icon={faIdCard} /> My Profile</Link>}
                                    {isAdmin() && <Link to="/admin/dashboard"><FontAwesomeIcon icon={faChartLine} /> Admin Dashboard</Link>}
                                </div>
                            </div>
                            :
                            <div>
                                <motion.button
                                    id="login"
                                    onClick={e => history.push('/login')}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FontAwesomeIcon icon={faKey} /> Log In
                                </motion.button>
                                <motion.button
                                    id="sign-up"
                                    onClick={e => history.push('/register')}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FontAwesomeIcon icon={faIdCard} /> Sign Up
                                </motion.button>
                            </div>
                        }
                    </div>
                </div>
                {children}
            </div>
            <footer>
                <div className="footer-container">
                    <div className="column">
                        About Us
                        <ul>
                            <li>History</li>
                            <li>Bylaws</li>
                            <li>Donate</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="column">
                        More
                        <ul>
                            <li>Placeholder 1</li>
                            <li>Placeholder 2</li>
                            <li>Placeholder 3</li>
                            <li>Placeholder 4</li>
                        </ul>
                    </div>
                    <div className="column">
                        More
                        <ul>
                            <li>Placeholder 1</li>
                            <li>Placeholder 2</li>
                            <li>Placeholder 3</li>
                            <li>Placeholder 4</li>
                        </ul>
                    </div>
                    <div className="column">
                        Connect
                        <ul>
                            <li><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</li>
                            <li><FontAwesomeIcon icon={faFacebook} /> Facebook</li>
                            <li><FontAwesomeIcon icon={faTwitter} /> Twitter</li>
                            <li><FontAwesomeIcon icon={faYoutube} /> Youtube</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-padding">
                    © 2022 TVMC Alumni Association of North America
                </div>
            </footer>
        </div>

    )
}

