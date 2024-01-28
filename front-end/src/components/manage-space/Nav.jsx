import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FaCar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { TiDocumentText } from "react-icons/ti";
import { RiLogoutCircleLine } from "react-icons/ri";

import { GlobalContext } from "../../util/GlobalContextComponent";

export default function Nav() {
    const gc = useContext(GlobalContext);
    const navigate = useNavigate();

    function handlerLogout() {
        gc.setManageSpace({});
        navigate("/");
    }

    return (
        <div className="fixed left-0 top-[50%] translate-y-[-50%] bg-c1">
            <div className="flex flex-col gap-6 m-4">
                {/* Link */}
                <NavLink className="text-white hover:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                        <FaCar className="text-2xl"></FaCar>
                        <div className="text-xs">Space</div>
                    </div>
                </NavLink>

                {/* Link */}
                <NavLink
                    className="text-white hover:text-gray-400"
                    to="/manage-space/details?action=view"
                >
                    <div className="flex flex-col items-center justify-center">
                        <TiDocumentText className="text-2xl"></TiDocumentText>
                        <div className="text-xs">Details</div>
                    </div>
                </NavLink>

                {/* Link */}
                <NavLink
                    className="text-white hover:text-gray-400"
                    to="/manage-space/details?action=edit"
                >
                    <div className="flex flex-col items-center justify-center">
                        <FiEdit className="text-[22px]"></FiEdit>
                        <div className="text-xs">Edit</div>
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
