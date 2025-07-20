'use client';

import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        < motion.section id="about" 
            initial = {{ opacity: 0, y: 10 }}
            whileInView = {{ opacity: 1, y: 0 }}
            transition = {{ duration: 0.5 }}>
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>

            <p className = "text-300 text-lg text-left max-w-3x1 mx-auto"
                >I am a Software Engineer with experience in managing middleware application and development of DotNet API for Dell Technologies.
            </p>
        </motion.section>
    );  
}