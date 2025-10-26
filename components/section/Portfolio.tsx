"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
    const containerRef = useRef(null);

    useEffect(() => {
        const animation = gsap
            .timeline({
                scrollTrigger: {
                    trigger: "#products",
                    start: "top 60%",
                    markers: false,
                },
            })
            .to(".image", {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.5,
                ease: "expo.inOut",
                stagger: 0.1,
            })
            .from(
                ".bgFlower",
                {
                    autoAlpha: 0,
                    duration: 1.2,
                    ease: "expo.inOut",
                },
                "-=1.5"
            );

        return () => {
            animation.kill();
        };
    }, []);

    useEffect(() => {
        const animation = gsap
            .timeline({
                scrollTrigger: {
                    trigger: "#products",
                    start: "top center",
                    markers: false,
                    scrub: 1.9,
                },
            })
            .to(".imageCollection", {
                scale: 1.3,
            });
        return () => {
            animation.kill();
        };
    }, []);

    return (
        <section id="products" className="w-full min-h-screen pt-32 bg-secondary">

            <div className="max-w-[1440px] mx-auto relative">
                <div className="flex flex-col justify-between items-center gap-8 mb-8 pb-4">

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

                    <div className="flex flex-row justify-between items-center w-full">
                        <a href="#products" className="opacity-0 text-2xl md:text-3xl tracking-wider text-amber-400 font-suisse-mono border-b-2 border-amber-400 pb-1">
                            Portfolio
                        </a>
                        <p className="font-suisse-mono uppercase text-5xl text-white">That outlive the day</p>
                        <p className="text-primary text-3xl bg-black/20 text-center font-suisse-mono border-b border-white">
                            Portfolio
                        </p>
                    </div>
                </div>


                <div className="py-2 lg:py-6 w-full">
                    <div className="relative">
                        <div
                            ref={containerRef}
                            className="w-full grid grid-cols-2 gap-1 md:flex md:flex-row md:gap-x-8 overflow-x-scroll overscroll-x-contain"
                        >
                            {collection?.map((items) => (
                                <div
                                    key={items.id}
                                    className="flex flex-col justify-center relative"
                                >
                                    <div className="mx-auto h-[350px] w-full md:h-[400px] md:w-[290px] xl:w-[480px] xl:h-[650px] overflow-hidden flex justify-center relative">
                                        <Image
                                            src={items.img}
                                            alt="queens collection image"
                                            className="absolute imageCollection h-full w-full object-cover grayscale-100 hover:grayscale-0 transition-all duration-400 object-center hidden md:flex image"
                                            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
                                            width={520}
                                            height={720}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;