import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../services/UsersService'
import { motion } from 'framer-motion'
import { Loading, Alert } from '../../../components/Global'
import ApplicantTile from './applicant.tile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import '../../../styles/settings.css'

export default function AdminDashboard() {

    const { getUnverifiedUsers } = useAuth()
    const [applicants, setApplicants] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        if (isLoading) {
            getUnverifiedUsers()
                .then(res => {
                    setLoading(false)
                    if (res.error) {
                        setError(res.error.message)
                    } else {
                        setApplicants(res.members)
                    }
                })
        }
    }, [applicants, getUnverifiedUsers, isLoading])

    return (
        <div className="main">
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="settings"
            >
                <h1><FontAwesomeIcon icon={faChartLine} /> Admin Dashboard</h1>
                <h2>Verify Users</h2>
                {isLoading
                    ?
                    <Loading />
                    :
                    <div className="applicants-container">
                        {(error
                            ?
                            <Alert message={error} />
                            :
                            applicants.map((applicant, i) => {
                                return <ApplicantTile
                                    key={applicant._id}
                                    applicant={applicant}
                                    delayTime={i}
                                />
                            })
                        )}
                    </div>
                }
            </motion.div>
        </div>
    )
}
