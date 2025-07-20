'use client';

import { motion } from "framer-motion";
import Image from 'next/image';

export default function HeroSection() {
    return (
            < motion.section id="Hero" className="flex flex-col md:flex-row items-center md:items-end text-center md:text-left py-12"
            initial = {{ opacity: 0, y: 10 }}
            whileInView = {{ opacity: 1, y: 0 }}
            transition = {{ duration: 0.5 }}>
                
                <div
                    className="md:w-1/2 text-4xl font-bold mb-4"
                    >
                        <h1>Hi, I'm Just</h1>
                        <h1>Another Software Engineer</h1>         
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <Image src="/Hero.png" alt="Profile" width={300} height={300} className="rounded-full mx-auto" />
                </div>
                
            </motion.section>
        );  
}