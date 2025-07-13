'use client';

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
            >
                <h1 className="text-4xl font-bold text-white">
                    Hi, I'm Yusuf!
                </h1>
                <p className="text-lg mt-4 text-gray-300">
                    Software Engineer • API Developer
                </p>
            </motion.div>
    );
}