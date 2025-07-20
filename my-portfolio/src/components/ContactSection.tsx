'use client';

import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <motion.section id="contact" className="py-12"
            initial = {{ opacity: 0, y: 10 }}
            whileInView = {{ opacity: 1, y: 0 }}
            transition = {{ duration: 0.5 }}>
            <h2 className="text-2xl font-semibold text-left mb-4">Contact</h2>
            <p>Feel free to connect!</p>
            <div className="mt-6 space-x-4">
                <a href="mailto:myusufbudiawan@gmail.com" className="text-indigo-400 hover:underline">
                    Email
                </a>
                <a href="https://github.com/myusufbudiawan" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                    GitHub
                </a>
                <a href="https://my.linkedin.com/in/yusuf-budiawan" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                    LinkedIn
                </a>
            </div>
        </motion.section>
    );
}