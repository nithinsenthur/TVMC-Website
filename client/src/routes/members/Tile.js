import React from 'react'
import { motion } from 'framer-motion'
import { Link, useRouteMatch } from 'react-router-dom'
import { Avatar } from '../../components/Global'
import config from '../../config.json'

export default function Tile({ member, delayTime }) {

    const { url } = useRouteMatch()
    let { assetsUrl } = config

    return (
        <motion.div 
            className="card"
            initial={{ scale: 0.75 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.025 }}
            transition={{ delay: 0.1 * delayTime }}
            >
            {member.avatar && <Avatar url={`${assetsUrl}${member.avatar}`} />}
            <h2><Link to={`${url}/${member.name}`}>{member.name}</Link></h2>
        </motion.div>
    )
}
