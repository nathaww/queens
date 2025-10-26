import Image from "next/image";

export default function OurStory(): React.ReactElement {

    return (
        <section className="mx-auto py-28 bg-secondary min-h-screen">
            <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-8">
                <div className="hidden lg:flex col-span-4">
                    <div className="w-full h-full relative overflow-hidden">
                        <Image
                            src="/imgs/story-section-image.jpg"
                            alt="Bride and Groom"
                            width={520}
                            height={1200}
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="col-span-12 md:col-span-8 px-2">
                    <p className="text-sm text-primary font-sans font-semibold mb-2 font-suisse-mono">
                        Adornment of Promise
                    </p>

                    <h2 className="text-4xl lg:text-6xl text-white font-light mb-6 font-suisse">
                        CHOSEN WITH CARE.
                        <br /> MADE FOR EVERY MOMENT.
                        <br /> ROOTED IN TRADITION
                    </h2>
                    <div className="flex gap-8">
                        <div className="flex flex-col justify-between gap-6">
                            <p className="text-xl text-gray-300 max-w-prose">
                                From the gown that carries her presence to the veil, jewelry, and shoes
                                that complete the look, every element is chosen to serve the bride&apos;s
                                journey. Each piece blends beauty, comfort, and heritage, supporting
                                her from preparation to ceremony. The collection is thoughtful and
                                intentional, meeting practical needs while celebrating cultural
                                identity, ensuring the bride&apos;s feels confident, honored, and
                                wholly herself throughout the day.
                            </p>

                            <p className="text-primary text-3xl bg-black/20 text-center font-suisse-mono border-b border-white">
                                Our Story
                            </p>
                        </div>

                        <div className="hidden lg:flex w-full relative overflow-hidden">
                            <Image
                                src="/imgs/story2.jpg"
                                alt="Gown on Display"
                                width={480}
                                height={500}
                                className="object-cover "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
