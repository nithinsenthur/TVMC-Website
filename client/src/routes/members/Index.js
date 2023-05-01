import React, { useState, useEffect } from 'react'
import { Loading, Alert } from '../../components/Global'
import Tile from './Tile'
import { useAuth } from '../../services/UsersService'

export default function MembersIndex({ query }) {

    const { getUsers } = useAuth()
    const [members, setMembers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        document.title = "Members"        
        if (isLoading) {
            getUsers(query)
                .then(res => {
                    setLoading(false)
                    if (res.error) {
                        setError(res.error.message)
                    } else {
                        setMembers(res.members)
                    }
                })
        }
    }, [members, getUsers, isLoading, query])

    return (
        <div className="main">
            {isLoading
                ?
                <Loading />
                :
                <div className="members-container">
                    {(error
                        ?
                        <Alert message={error} />
                        :
                        members.map((member, i) => {
                            return <Tile
                                key={member._id}
                                member={member}
                                delayTime={i}
                            />
                        })
                    )}
                </div>
            }
        </div>
    )
}

