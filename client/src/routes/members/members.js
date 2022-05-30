import React from 'react'
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'
import MembersIndex from '.'
import Profile from './profile'
import '../../styles/members.css'

export default function Members() {
    const query = new URLSearchParams(useLocation().search)
    const { url } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={url}>
                    <div
                        className="primary"
                    >
                        <h1><FontAwesomeIcon icon={faAmbulance} /> Members</h1>
                    </div>
                    <MembersIndex query={query.get("search")} />
                </Route>
                <Route path={`${url}/:name`}>
                    <Profile />
                </Route>
            </Switch>
        </div>
    )
}



