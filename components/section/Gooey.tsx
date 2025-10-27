"use client";

import { useEffect, useRef, useState } from "react";

export default function GooeyCursor() {
    const [target, setTarget] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const requestRef = useRef<number>(0);

    // Smooth follow (lerp)
    useEffect(() => {
        const lerp = (start: number, end: number, amount: number) =>
            start + (end - start) * amount;

        const animate = () => {
            setPosition((prev) => ({
                x: lerp(prev.x, target.x, 0.1),
                y: lerp(prev.y, target.y, 0.1),
            }));
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [target]);

    // Track cursor
    useEffect(() => {
        const move = (e: MouseEvent) => {
            setTarget({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    const radius = 240; // half of 240px

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">

            {/* Grayscale background */}
            <div
                className="absolute inset-0 bg-[url('/imgs/hero.jpg')] bg-cover bg-center grayscale"
            />

            {/* Colored background (revealed via mask) */}
            <div
                className="absolute inset-0 bg-[url('/imgs/hero.jpg')] bg-cover bg-center"
                style={{
                    WebkitMaskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, white 100%, transparent 100%)`,
                    maskImage: `radial-gradient(circle ${radius}px at ${position.x}px ${position.y}px, white 100%, transparent 100%)`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    transition: "mask-position 0.2s ease-out",
                }}
            />
        </div>
    );
}
