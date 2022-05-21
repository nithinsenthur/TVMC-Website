import React from 'react'
import { motion } from 'framer-motion'
import { Link, useRouteMatch } from 'react-router-dom'
import { Avatar } from '../../components/global'
export default function Tile({ member, delayTime }) {

    const { url } = useRouteMatch()

    return (
        <motion.div 
            className="card"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.1 * delayTime }}
            >
            {member.avatar && <Avatar url={`http://localhost:5000/${member.avatar}`} />}
            <h2><Link to={`${url}/${member.name}`}>{member.name}</Link></h2>
        </motion.div>
    )
}
