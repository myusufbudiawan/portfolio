'use client';

import { motion } from "framer-motion";
import { FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { TbBrandCSharp } from "react-icons/tb";

export default function AboutSection() {
    return (
        < section id="about" className="space-y-6">
            <motion.h2
                className="text-3xl font-bold text-left"
                initial = {{ opacity: 0, y: 10 }}
                whileInView = {{ opacity: 1, y: 0 }}
                transition = {{ duration: 0.5 }}
                >
                    About Me
            </motion.h2>

            <motion.p
                className = "text-300 text-lg text-center max-w-3x1 mx-auto"
                initial = {{ opacity: 0 }}
                whileInView = {{ opacity: 1 }}
                transition = {{ delay: 0.2, duration: 0.5 }}
                >
                    I am a Software Engineer with experience in managing middleware application and development of DotNet API for Dell Technologies.
            </motion.p>

            <motion.div
                className="flex justify-center gap-6 text-4xl text-indigo-400 mt-4"
                initial = {{ opacity: 0 }}
                whileInView = {{ opacity: 1 }}
                transition = {{ delay: 0.2, duration: 0.5 }}>
                <TbBrandCSharp title="C#" />
                <FaNodeJs title="Node.js" />
                <FaPython title="Python" />
                <FaDatabase title="Databases" />
            </motion.div>
        </section>
    );  
}