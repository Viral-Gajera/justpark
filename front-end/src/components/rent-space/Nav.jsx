import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { GlobalContext } from "../../util/GlobalContextComponent";

import { FiEdit } from "react-icons/fi";
import { TiDocumentText } from "react-icons/ti";
import { RiLogoutCircleLine } from "react-icons/ri";

import { FaHistory } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";

export default function Nav() {
    const gc = useContext(GlobalContext);
    const navigate = useNavigate();

    function handlerLogout() {
        gc.setRentSpace({});
        navigate("/");
    }

    return (
        <div className="fixed left-0 top-[50%] translate-y-[-50%] bg-c1 border border-l-0 z-[999]">
            <div className="flex flex-col gap-6 m-4">
                {/* Link */}
                <NavLink className="text-white hover:text-gray-400" to="">
                    <div className="flex flex-col items-center justify-center">
                        <FiEdit className="text-[22px] mb-0.5"></FiEdit>
                        <div className="text-xs">Book</div>
                    </div>
                </NavLink>

                {/* Link */}
                <NavLink className="text-white hover:text-gray-400" to="booked">
                    <div className="flex flex-col items-center justify-center">
                        <IoBookmark className="text-2xl"></IoBookmark>
                        <div className="text-xs">Booked</div>
                    </div>
                </NavLink>

                {/* Link */}
                <NavLink
                    className="text-white hover:text-gray-400"
                    to="history"
                >
                    <div className="flex flex-col items-center justify-center">
                        <FaHistory className="text-[21px]"></FaHistory>
                        <div className="text-xs">History</div>
                    </div>
                </NavLink>

                {/* Link */}
                <div
                    className="flex flex-col items-center justify-center text-white hover:text-gray-400"
                    onClick={handlerLogout}
                >
                    <RiLogoutCircleLine className="text-2xl"></RiLogoutCircleLine>
                    <div className="text-xs">Logout</div>
                </div>
            </div>
        </div>
    );
}
