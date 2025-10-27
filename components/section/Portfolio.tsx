"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);


const collection = [
    {
        id: 1,
        name: "Spring Collection",
        img: "/imgs/collection1.webp",
    }
    ,
    {
        id: 2,
        name: "Summer Collection",
        img: "/imgs/collection.webp",
    },
    {
        id: 3,
        name: "Autumn Collection",
        img: "/imgs/collection3.webp",
    },
    {
        id: 4,
        name: "Winter Collection",
        img: "/imgs/collection4.webp",
    },
]

const Portfolio = () => {

    return (
        <section id="products" className="w-full min-h-screen pt-12 lg:pt-32 bg-secondary">

            <div className="max-w-[1440px] mx-auto relative">
                <div className="flex flex-col justify-between items-center gap-8 mb-8 pb-4 px-2">

                    <div className="flex items-center justify-start w-full">
                        <div className="overflow-hidden max-w-4xl">
                            <h2 className="font-suisse uppercase text-4xl md:text-6xl lg:text-7xl text-gray-300 mb-4">
                                CRAFTED FOR MOMENTS
                            </h2>
                            <p className="text-sm md:text-base text-gray-400 max-w-2xl">
                                Every bride we&apos;ve dressed carries a world within her and our work exists to honor it. This
                                collection isn&apos;t about gowns alone, but about presence, confidence, and the art of becoming
                                yourself on the day that matters most.
                            </p>
                        </div>
                        <div className="w-40 h-40 md:w-44 md:h-44 relative">
                            {/* circular text using SVG */}
                            <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
                                <defs>
                                    <path id="circlePath" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
                                </defs>
                                <g>
                                    <text fill="#ecb463" fontSize="18" fontFamily="var(--font-suisse)">
                                        <textPath href="#circlePath" startOffset="0">
                                            QUEENS BRIDAL CLOSET • QUEENS BRIDAL CLOSET •
                                        </textPath>
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col md:flex-row justify-between items-center w-full">
                        <a href="#products" className="opacity-0 text-2xl md:text-3xl tracking-wider text-amber-400 font-suisse-mono border-b-2 border-amber-400 pb-1">
                            Portfolio
                        </a>
                        <p className="font-suisse-mono uppercase text-5xl text-white">That outlive the day</p>
                        <p className="text-primary text-3xl bg-black/20 text-center font-suisse-mono border-b border-white">
                            Portfolio
                        </p>
                    </div>
                </div>


                <div className="lg:py-6 w-full">
                    <div className="relative">
                        <MarqueeGallery items={collection} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;

function MarqueeGallery({ items }: { items: { id: number; name: string; img: string }[] }) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const x = useMotionValue(0);
    // force leftward motion only
    const directionRef = useRef<number>(-1);
    const speed = 60; // px per second
    const trackWidth = useRef<number>(0);
    const pausedRef = useRef<boolean>(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // measure one copy width
        const measure = () => {
            trackWidth.current = track.scrollWidth / 2 || 0;
        };
        measure();
        const onResize = () => measure();
        window.addEventListener('resize', onResize);

        let lastTime = performance.now();
        const tick = (t: number) => {
            const dt = (t - lastTime) / 1000;
            lastTime = t;

            if (!pausedRef.current) {
                const cur = x.get();
                let next = cur + directionRef.current * speed * dt;
                // wrap around when scrolled past one track width
                if (trackWidth.current > 0) {
                    if (-next >= trackWidth.current) {
                        next += trackWidth.current;
                    }
                }
                x.set(next);
            }

            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('resize', onResize);
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        };
    }, [x]);

    // render two copies of the list for seamless loop
    const doubled = [...items, ...items];

    return (
        <div className="w-full overflow-hidden">
            <div ref={trackRef} className="relative">
                <motion.div style={{ x }} className="flex items-start whitespace-nowrap will-change-transform">
                    {doubled.map((it, idx) => (
                        <div
                            key={`${it.id}-${idx}`}
                            className="flex flex-col justify-center relative px-2"
                            onPointerEnter={() => { pausedRef.current = true; }}
                            onPointerLeave={() => { pausedRef.current = false; }}
                            onFocus={() => { pausedRef.current = true; }}
                            onBlur={() => { pausedRef.current = false; }}
                            tabIndex={0}
                        >
                            <div className="mx-auto h-[350px] w-full md:h-[400px] md:w-[290px] xl:w-[480px] xl:h-[650px] overflow-hidden flex justify-center relative">
                                <Image
                                    src={it.img}
                                    alt={it.name}
                                    className="absolute imageCollection h-full w-full object-cover grayscale-100 hover:grayscale-0 transition-all duration-400 object-center"
                                    width={520}
                                    height={720}
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}