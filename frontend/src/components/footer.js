import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {

    return (
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
    )
}
