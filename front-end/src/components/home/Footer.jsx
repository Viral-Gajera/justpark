import React from "react";
import { NavLink } from "react-router-dom";

import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="px-10 pt-16 pb-10 text-sm text-white bg-c1">
            <div className="flex flex-wrap justify-around gap-16 mb-10 ">
                <div className="flex flex-col items-center gap-2">
                    <div className="text-xl font-bold">JustPark</div>
                    <div className="max-w-[300px] text-center">
                        Think you'd make a good fit on our team? Jumpstart your
                        career and refine your skills in one of our highly
                        skilled teams.
                    </div>
                    <div className="flex gap-3 hover:[&_div]:border-gray-400">
                        <NavLink to="">
                            <div className="p-2 border border-white rounded-full">
                                <FaTwitter></FaTwitter>
                            </div>
                        </NavLink>
                        <NavLink to="">
                            <div className="p-2 border border-white rounded-full">
                                <FaFacebook></FaFacebook>
                            </div>
                        </NavLink>
                        <NavLink to="">
                            <div className="p-2 border border-white rounded-full">
                                <FaInstagram></FaInstagram>
                            </div>
                        </NavLink>
                        <NavLink to="">
                            <div className="p-2 border border-white rounded-full">
                                <FaLinkedin></FaLinkedin>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div>
                    <div className="mb-4 font-bold">Useful Links</div>
                    <div className="flex flex-col gap-2">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/manage-space">Manage Space</NavLink>
                        <NavLink to="/rent-space">Rent Space</NavLink>
                        <NavLink to="/admin">Admin</NavLink>
                    </div>
                </div>
                <div>
                    <div className="mb-4 font-bold">Our Services</div>
                    <div className="flex flex-col gap-2">
                        <NavLink to="">Car park management</NavLink>
                        <NavLink to="">Electric vehicle charging</NavLink>
                        <NavLink to="">Rent out your EV charger</NavLink>
                    </div>
                </div>
                <div>
                    <div className="mb-4 font-bold">Contact Us</div>
                    <div className="flex flex-col gap-2 mb-4">
                        Aji dem,Rajkot-Morbi Hwy <br /> Rajkot, NY 535022 <br />{" "}
                        Gujrat,India
                    </div>
                    <div>
                        <span className="font-bold">Phone:</span> +91 9714040515{" "}
                        <br /> <span className="font-bold">Email:</span>{" "}
                        viral.gajera@gmail.com
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center ">
                <div>
                    &copy; Copyright
                    <span className="font-bold"> JustPark</span>. All Rights
                    Reserved
                </div>
                <div>Designed by JustPark Team</div>
            </div>
        </footer>
    );
}
