import Image from 'next/image'

const LandingCard = ({ className }: { className?: string }) => {
    return (
        <div className={`rounded-3xl flex justify-between gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm items-center ${className}`}>
            <Image
                src="/imgs/hanger.webp"
                width={60}
                height={70}
                alt="Hanger image"
                className="rounded-2xl bg-gray-300 p-2" />
            <p className='font-suisse max-w-xs text-white'>
                Create Your Own <br /> Dress!
            </p>
        </div>
    )
}

export default LandingCard