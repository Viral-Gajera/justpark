import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="fixed top-0 flex justify-between w-full px-10 py-5 text-white bg-opacity-90 bg-c1">
            <div className="text-xl font-bold">JustPark</div>
            <div className="flex items-center gap-5 text-base">
                <NavLink
                    to="/"
                    className="hover:text-gray-400"
                    style={({ isActive }) => ({
                        borderBottom: isActive ? "2px solid white" : "",
                    })}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/manage-space"
                    className="hover:text-gray-400"
                    style={({ isActive }) => ({
                        borderBottom: isActive ? "2px solid white" : "",
                    })}
                >
                    Manage Space
                </NavLink>
                <NavLink
                    to="/rent-space"
                    className="hover:text-gray-400"
                    style={({ isActive }) => ({
                        borderBottom: isActive ? "2px solid white" : "",
                    })}
                >
                    Rent Space
                </NavLink>
                <NavLink
                    to="/admin"
                    className="hover:text-gray-400"
                    style={({ isActive }) => ({
                        borderBottom: isActive ? "2px solid white" : "",
                    })}
                >
                    Admin
                </NavLink>
            </div>
        </nav>
    );
}
