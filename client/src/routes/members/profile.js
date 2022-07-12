import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router'
import { useAuth } from '../../services/UsersService'
import { Loading, Avatar } from '../../components/Global'
import config from "../../config.json"
import NotFound from '../other/NotFound'

export default function Profile() {

    const { name } = useParams()
    const { getUsers } = useAuth()
    const [isLoading, setLoading] = useState(true)
    const [member, setMember] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        getUsers(name)
            .then(res => {
                if (res.members[0]) {
                    setMember(res.members[0])
                } else {
                    setError("User not found")
                }
                setLoading(false)
            }
            )
    }, [])

    return (
        <div className="main">
            {isLoading
                ?
                <Loading />
                :
                <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                >
                    {(error
                        ?
                        <NotFound />
                        :
                        <div className="profile">
                            <div className="card">
                                <h1>{member.name}</h1>
                                {member.avatar && <Avatar url={`${config.siteURL}/${member.avatar}`} />}
                                <h2>{member.role} {member.specialty && <span>| {member.specialty}</span>}</h2>
                                <strong>Joined:</strong> {new Date(member.date).toDateString()}
                                <div>
                                    <strong>Email:</strong> {member.email}<br />
                                    <strong>Phone:</strong> {member.phone}<br />
                                    {member.class && <span><strong>Class: </strong> {member.class}<br /></span>}
                                    <strong>Location:</strong> {member.address.street && <span>{member.address.street}, </span>} {member.address.city}, {member.address.state}, {member.address.zipcode}< br />
                                    {member.interests && <span><strong>Interests:</strong> {member.interests.join(', ')}<br /></span>}
                                </div>
                            </div>
                            {member.description &&
                                <div className="card">
                                    <div>
                                        <h1>About Me</h1>
                                        {member.description}
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                </motion.div>
            }
        </div>
    )
}
