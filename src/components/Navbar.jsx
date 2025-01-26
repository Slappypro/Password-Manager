import React from 'react'

function Navbar() {
    return (
        <div className='flex justify-between items-center text-white px-3 md:px-16 h-[10vh] bg-gray-800'>
            <div className='font-bold text-2xl'>
                Password <span className='text-green-300'>Operator</span>
            </div>
            <ul className='flex gap-3 md:gap-5'>
                <li className='font-bold'>Home</li>
                <li className='font-bold'>About</li>
                <li className='font-bold'>Contact Us</li>
            </ul>
        </div>
    )
}

export default Navbar
