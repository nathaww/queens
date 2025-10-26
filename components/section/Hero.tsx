import GlassButton from "../ui/GlassButton/GlassButton";


const Hero = () => {


    return (
        <section
            className="relative min-h-screen bg-[url('/imgs/hero.jpg')] bg-no-repeat bg-center bg-cover flex justify-center items-end py-12"
        >
            <div className="w-screen h-screen bg-black/50 absolute top-0 left-0 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col justify-center gap-6 items-center text-white">
                <p className=" font-(--font-suisse-mono) uppercase">The Curated Atelier</p>
                <h1 className="text-4xl md:text-5xl font-tempting text-center">Unforgettable Moments</h1>
                <p className="max-w-[780px] text-center font-suisse-mono text-sm md:text-lg">
                    Step into your dream day without compromise. We offer an expertly curated collection of
                    high-fashion bridal and evening wear, making luxury accessible for the most cherished occasions.
                </p>
                <div className="flex gap-4">
                    <GlassButton
                        className=""
                        text1="View"
                        text2="Collection"
                    />
                    <GlassButton
                        className=""
                        text1="Create"
                        text2="Your Dress"
                    />
                </div>
            </div>

        </section>
    )
}

export default Hero