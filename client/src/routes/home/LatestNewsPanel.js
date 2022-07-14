import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function LatestNewsPanel({ img, title }) {
    return (
        <div 
            className="panel" 
            style={{backgroundImage: 
                    `linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.6) 100%),
                    url(${process.env.REACT_APP_SITE_URL}/${img})`}}>
            <div className="info">
                <h3>
                    {title}
                </h3>
                <Link to={`news/${title}`}>
                    Find Out More <FontAwesomeIcon icon={faArrowRight} /> 
                </Link>
            </div>
        </div>
    )
}

