import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faNewspaper, faUsers, faIdCard, faKey, faPhotoVideo,
    faComments, faUserCircle, faCogs, faChartLine, faDoorClosed, faStethoscope,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../services/users.service'

export default function Header() {

    const { isLoggedIn, isVerified, isAdmin, getUsername } = useAuth()
    let history = useHistory()

    return (
        <div className="header">
            
            <div className="left">
                <div className="logo-emblem">
                    <Link to="/">
                        <div className="emblem">
                            <img src="http://localhost:5000/public/images/image0.jpeg"></img>
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
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/forums">Forums</Link></li>
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
    )
}

