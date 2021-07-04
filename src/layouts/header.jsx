import React from 'react'
import { BiSearch } from "react-icons/bi";
import { FcClapperboard } from "react-icons/fc";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="bg-main py-4">
            <div className="px-12 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-3 text-2xl text-gray-300 font-bold">
                    <FcClapperboard className="mt-1"/>
                    <h1 className="">Rebel Movie</h1>
                </Link>
                <div className="flex items-center space-x-5">
                    <div className="relative hidden lg:inline-block">
                        <input type="text"  className="bg-input rounded-full pl-4 pr-10 py-2 focus:outline-none text-gray-400 w-72" placeholder="Search what you like"/>
                        <BiSearch className="absolute top-3 right-4 text-gray-400 cursor-pointer"/>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-input">
                        <img src={require('../assets/img/user.png').default} alt="user" className="rounded-full cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
