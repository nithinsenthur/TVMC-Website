import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import config from '../../config.json'

export default function LatestNewsPanel({ img, description, title }) {

    const { url } = useRouteMatch()

    return (
        <div className="panel">
            {img && <img src={`${config.siteURL}/${img}`} />}
            <div className="info">
                <h3>
                    <Link to={`${url}/${title}`}>{title}</Link>
                </h3>
                <div className="description">
                    {description}
                </div>
            </div>
        </div>
    )
}

