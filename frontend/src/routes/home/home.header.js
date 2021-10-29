import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUsers, faIdCard, faHeartbeat, faPhotoVideo, 
    faComments, faBars, faCogs, faChartLine, faDoorClosed, faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../services/users.service'

export default function HomeHeader() {

    const { isLoggedIn, isVerified, isAdmin, getUsername } = useAuth()

    return (
        <div id="home-header">
            <div id="logo">
                <Link to="/">
                    <FontAwesomeIcon icon={faHeartbeat} /> Tirunelveli Medical College Alumni
                </Link>
            </div>
            <div id="navbar">
                <ul>
                    {isVerified() && <li><Link to="/members"><FontAwesomeIcon icon={faUsers} /> Members</Link></li>}
                    <li><Link to="/about"><FontAwesomeIcon icon={faStethoscope} /> About</Link></li>
                    <li><Link to="/news"><FontAwesomeIcon icon={faNewspaper} /> News</Link></li>
                    <li><Link to="/gallery"><FontAwesomeIcon icon={faPhotoVideo} /> Gallery</Link></li>
                    <li><Link to="/forums"><FontAwesomeIcon icon={faComments} /> Forums</Link></li>
                    {isLoggedIn()
                        ? <div className="dropdown">
                            <div id="icon">
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                            <div className="dropdown-content">
                                <Link to="/logout"><FontAwesomeIcon icon={faDoorClosed} /> Log Off</Link>
                                <Link to="/settings"><FontAwesomeIcon icon={faCogs} /> Settings</Link>
                                {isVerified() && <Link to={`/members/${getUsername()}`}><FontAwesomeIcon icon={faIdCard} /> My Profile</Link>}
                                {isAdmin() && <Link to="/admin/dashboard"><FontAwesomeIcon icon={faChartLine} /> Admin Dashboard</Link>}
                            </div>
                        </div>
                        : <li id="login"><Link to="/login"><FontAwesomeIcon icon={faIdCard} /> Log In</Link></li>
                    }
                </ul>
            </div>
        </div>
    )
}

