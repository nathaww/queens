import Image from 'next/image'
import React from 'react'

const NavBar = () => {
  return (
    <div className='absolute z-10 top-0 left-0 p-3 w-full font-suisse-mono border-b border-white text-white bg-black/20 backdrop-blur-md'>
      <ul className='flex justify-center lg:justify-between items-center font-suisse text-sm px-4'>
        <li className='hidden lg:flex'><a>About Us</a></li>
        <li className='hidden lg:flex'><a>Portfolio</a></li>
        <li className='hidden lg:flex'><a>Dress Modeler</a></li>
        <li>
          <a>
            <Image
              src="/imgs/logo.webp"
              width={130}
              height={70}
              alt="Queens logo"
              className="" />
          </a>
        </li>
        <li className='hidden lg:flex'><a>Collection</a></li>
        <li className='hidden lg:flex'><a>Contact Us</a></li>
        <li className='hidden lg:flex'><a>Sound</a></li>
      </ul>
    </div>
  )
}

export default NavBar