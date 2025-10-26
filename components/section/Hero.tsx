"use client";
import GlassButton from "../ui/GlassButton/GlassButton";
import LandingCard from "../ui/LandingCard";
import { useRef, useState, useEffect } from "react";


const Hero = () => {
    const heroRef = useRef<HTMLElement | null>(null);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    // positions are in pixels relative to the hero's top-left
    const [followPos, setFollowPos] = useState<{ x: number; y: number } | null>(null);
    const [anchorPos, setAnchorPos] = useState<{ x: number; y: number } | null>(null);
    const [isInside, setIsInside] = useState(false);

    useEffect(() => {
        // compute anchor position based on the invisible anchor element
        const computeAnchor = () => {
            const hero = heroRef.current;
            const anchor = anchorRef.current;
            if (!hero || !anchor) return;
            const heroRect = hero.getBoundingClientRect();
            const aRect = anchor.getBoundingClientRect();
            const x = aRect.left - heroRect.left + aRect.width / 2;
            const y = aRect.top - heroRect.top + aRect.height / 2;
            setAnchorPos({ x, y });
        };

        computeAnchor();
        window.addEventListener("resize", computeAnchor);
        return () => window.removeEventListener("resize", computeAnchor);
    }, []);

    const handleMove = (e: React.MouseEvent) => {
        const hero = heroRef.current;
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setFollowPos({ x, y });
    };

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMove}
            onMouseEnter={() => setIsInside(true)}
            onMouseLeave={() => setIsInside(false)}
            className="relative min-h-screen bg-[url('/imgs/hero-bg.webp')] bg-no-repeat bg-center bg-cover flex justify-center items-end py-32"
        >
            <div className="w-screen h-screen bg-black/40 absolute top-0 left-0 pointer-events-none"></div>

            {/* invisible anchor to measure default button location */}
            <div ref={anchorRef} className="absolute bottom-32 left-12 w-0 h-0 pointer-events-none" aria-hidden />

            {/* pass follow props to GlassButton; when isInside is true we follow the cursor, otherwise we animate back to anchor */}
            <GlassButton
                className="hidden lg:flex"
                text1="View"
                text2="Products"
                followPos={followPos}
                anchorPos={anchorPos}
                followActive={isInside}
            />

            <div className="relative z-10 flex flex-col justify-center gap-6 items-center text-white">
                <p className=" font-(--font-suisse-mono) uppercase">The Curated Atelier</p>
                <h1 className="text-4xl md:text-5xl font-tempting text-center">Unforgettable Moments</h1>
                <p className="max-w-[780px] text-center font-suisse-mono text-sm md:text-lg">
                    Step into your dream day without compromise. We offer an expertly curated collection of
                    high-fashion bridal and evening wear, making luxury accessible for the most cherished occasions.
                </p>
            </div>

            <LandingCard className="hidden lg:flex absolute bottom-6 right-12" />

        </section>
    )
}

export default Hero