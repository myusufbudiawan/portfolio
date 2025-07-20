'use client';

import {motion} from "framer-motion"

export default function Header() {
    return (
        <motion.header
            className="py-4"
            initial = {{ opacity: 0, y: 10 }}
            whileInView = {{ opacity: 1, y: 0 }}
            transition = {{ duration: 0.5 }}>
        <h1 className="text-xl font-bold">MUHAMMAD YUSUF BUDIAWAN</h1>
        </motion.header>
    )
    
}