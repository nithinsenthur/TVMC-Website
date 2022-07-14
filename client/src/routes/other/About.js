import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export default function About() {

    useEffect(() => {
      document.title = "About Us"
    }, [])
    
    return (
        <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="main">
            <div
                className="primary"
            >
                <h1><FontAwesomeIcon icon={faQuestionCircle} /> About Us</h1>
            </div>
            <p>
                Annual Alumni/Social meeting; Will be conducted across various cities of
                North America every year and co-ordinated services and education year long.
                The participants are all members from the TVMC Alumni Association of North
                America and visiting emeritus from parent organisation.
            </p>
            <p>
                Educational Program: Interactive seminar through online and in-person targeting the TVMC
                medical students and Alumni physicians across the world  periodically, mainly at cities of
                USA and cities of Tamil Nadu, India.
            </p>
            <p>
                Services: includes providing education and financial support for students in need on annual
                basis. Providing basic medical services and expertise to the people in need at USA and India
                annually. A non-profit organisation to bring all alumni of TVMC living in North America for
                philanthropic, educational and services with parent organisation.</p>
            <p>
                Charitable, Educational, Scientific 501(c)(3)
            </p>
        </motion.div>
    )
}
