"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

    const handleLeft = () => {
        const scrollDistance = 650;
        const scrollAmount = -scrollDistance;
        gsap.to(containerRef.current, {
            scrollLeft: `+=${scrollAmount}`,
            duration: 1.5,
            ease: "expo.inOut",
        });
    };

    const handleRight = () => {
        const scrollDistance = 650;
        const scrollAmount = scrollDistance;
        gsap.to(containerRef.current, {
            scrollLeft: `+=${scrollAmount}`,
            duration: 1.5,
            ease: "expo.inOut",
        });
    };

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
        <section id="products" className="w-full min-h-screen pt-32 bg-background">

            <div className="max-w-[1440px] mx-auto relative">
                <div className="flex flex-row justify-between items-center border-b border-gray-400 gap-8 mb-8 pb-4">
                    <div className="overflow-hidden">
                        <p className="text-center font-suisse uppercase text-4xl px-2 md:text-6xl lg:text-6xl xl:text-6xl text-black mb-6">
                            <span className="text-gray-500 font-suisse-mono font-thin ">Our</span> Collection
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="border border-gray-400 text-gray-400 uppercase h-max py-1 px-4">
                            All Collection
                        </p>
                        <p className="text-white hover:scale-105 active:scale-90 transition-all duration-200 hidden sm:flex lg:flex xl:flex  sm:top-12 top-0 right-24 font-canela gap-1 items-center">
                            <ArrowLeft
                                onClick={handleLeft}
                                className="text-3xl text-primary cursor-pointer"
                            />
                        </p>
                        <p className="text-white hover:scale-105 active:scale-90 transition-all duration-200 hidden sm:flex lg:flex xl:flex  sm:top-12 top-0 right-14 font-canela gap-1 items-center">
                            <ArrowRight
                                onClick={handleRight}
                                className="text-3xl text-primary cursor-pointer"
                            />
                        </p>
                    </div>
                </div>


                <div className="py-2 lg:py-6 w-full">
                    <div className="relative">
                        <div
                            ref={containerRef}
                            className="w-full grid grid-cols-2 gap-1 md:flex md:flex-row md:gap-x-8 overflow-x-scroll overscroll-x-contain"
                        >
                            <div className="flex flex-col gap-8 min-w-96">
                                <p className="text-4xl uppercase text-gray-500 font-suisse font-medium">
                                    Discover our collection
                                </p>
                                <p className="font-suisse-mono text-gray-500">
                                    A curated collection for the bride, bringing together dresses, veils, accessories, and jewelry.
                                </p>
                            </div>
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