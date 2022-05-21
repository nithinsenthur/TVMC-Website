import React from 'react'
import { motion } from 'framer-motion'

export default function Gallery() {
    return (
        <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="main">
            <h1>About Us</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non volutpat tellus, eget laoreet diam. Morbi eget libero rhoncus, eleifend augue quis, consectetur nibh. Nullam porttitor vel nibh eu convallis. Curabitur eget dui blandit, facilisis massa sit amet, laoreet velit. Curabitur non dignissim nisi. Maecenas gravida pharetra lectus eget maximus. Proin lectus enim, malesuada id tincidunt eu, placerat eu massa. Aenean a viverra augue, quis aliquam tellus. Nam vel ipsum ac enim laoreet congue id sed nisl. Suspendisse nibh mauris, pretium vel dictum euismod, malesuada vel nulla. Nullam sodales laoreet quam, quis lacinia lorem placerat a.</p>
        </motion.div>
    )
}
