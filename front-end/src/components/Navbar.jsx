import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="fixed top-0 flex justify-between w-[calc(100vw)] px-10 py-2 text-white bg-opacity-90 bg-c1">
            <div className="text-xl font-bold">JustPark</div>
            <div className="items-center hidden gap-5 text-sm sm:flex">
                <Link to="/" className="hover:text-gray-400">
                    Home
                </Link>
                <Link to="/manage-space" className="hover:text-gray-400">
                    Manage Space
                </Link>
                <Link to="/rent-space" className="hover:text-gray-400">
                    Rent Space
                </Link>
                <Link to="/admin" className="hover:text-gray-400">
                    Admin
                </Link>
            </div>
        </nav>
    );
}
