import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../../services/users.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function ApplicantTile({ applicant, delayTime }) {

    const { verify, deleteMember } = useAuth()

    return (
        <motion.div
            className="card"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.1 * delayTime }}
        >
            <strong>{applicant.name}</strong>
            <div>
                Class: {applicant.class}
            </div>
            <div>
                Role: {applicant.role}
            </div>
            <div>
                Speciality: {applicant.specialty}
            </div>
            <div>
                Phone: {applicant.phone}
            </div>
            <div>
                Address: {applicant.address.street && <span>{applicant.address.street}, </span>} {applicant.address.city}, {applicant.address.state}, {applicant.address.zipcode}
            </div>
            <div>
                Class: {applicant.class}
            </div>
            {applicant.interests && <div>Interests: {applicant.interests.join(', ')}</div>}
            <div>
                <button 
                    onClick={async e => {
                        await verify(applicant._id)
                        window.location.reload(false)
                }}>
                    <FontAwesomeIcon icon={faCheck} /> Approve
                </button>
                <button onClick={async e => {
                    await deleteMember(applicant._id)
                    window.location.reload(false)
                }}>
                    <FontAwesomeIcon icon={faTimes} /> Reject
                </button>
            </div>
        </motion.div>
    )
}
