"use client";
import Image from "next/image";

export default function Location(): React.ReactElement {

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="w-full bg-secondary relative">
            <div className="bg-background lg:min-h-screen rounded-b-[6rem] h-full flex flex-col lg:gap-8">
                <div className="w-full h-1/2 relative overflow-hidden">

                    <div className="absolute left-6 top-6 text-2xl font-suisse text-neutral-900">
                        {"{Q}"}
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548370388151!2d38.71494957597439!3d9.013637089227256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b87d990dfa5b3%3A0xd5ad912531b2e9c!2sQueens%20Supermarket!5e0!3m2!1sen!2sus!4v1761484822957!5m2!1sen!2sus"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>


                <div className="w-full h-full overflow-hidden relative">
                    <div className="mx-auto py-16 lg:py-32 px-8 text-center">
                        <h2 className="font-suisse font-bold text-4xl lg:text-7xl">
                            YOUR NEXT DRESS AWAITS.
                        </h2>
                    </div>
                </div>
            </div>
            <Image
                src="/imgs/string.webp"
                alt="Location"
                width={150}
                height={400}
                className="w-24 lg:w-44 hidden lg:flex absolute z-10 left-1/2 -translate-x-1/2 lg:-bottom-44"
            />
            <Image
                src="/imgs/stt.webp"
                alt="Location"
                width={50}
                height={50}
                className="absolute z-10 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-14  bottom-1 lg:bottom-14 active:scale-95 transition-all duration-500"
                onClick={scrollTop}
            />
        </section>
    );
}
