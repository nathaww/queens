"use client"
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Gallery() {
    
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pictures = [
        {
            src: '/imgs/collection1.webp',
            scale: scale4
        },
        {
            src: '/imgs/collection2.webp',
            scale: scale5
        },
        {
            src: '/imgs/collection3.webp',
            scale: scale6
        },
        {
            src: '/imgs/collection4.webp',
            scale: scale5
        },
        {
            src: '/imgs/collection.webp',
            scale: scale6
        },
        {
            src: '/imgs/story1.webp',
            scale: scale8
        },
        {
            src: '/imgs/story2.webp',
            scale: scale9
        }
    ]

    const itemStyles: Array<React.CSSProperties> = [
        { width: '25vw', height: '25vh' },
        { top: '-30vh', left: '5vw', width: '35vw', height: '30vh' },
        { top: '-10vh', left: '-25vw', width: '20vw', height: '45vh' },
        { left: '27.5vw', width: '25vw', height: '25vh' },
        { top: '27.5vh', left: '5vw', width: '20vw', height: '25vh' },
        { top: '27.5vh', left: '-22.5vw', width: '30vw', height: '25vh' },
        { top: '22.5vh', left: '25vw', width: '15vw', height: '15vh' },
    ];

    return (
        <div ref={container} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 h-screen overflow-hidden">
                {pictures.map(({ src, scale }, index) => (
                    <motion.div
                        key={index}
                        style={{ scale }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div
                            className="relative overflow-hidden"
                            style={itemStyles[index]}
                        >
                            <Image src={src} fill alt={`gallery-${index}`} className="object-cover grayscale-100 hover:grayscale-0 duration-500" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}