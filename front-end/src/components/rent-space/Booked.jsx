import { useEffect, useContext, useState } from "react";

import fetchData from "../../util/fetchData";
import customMarkerIcon from "../../images/location marker.png";
import { GlobalContext } from "../../util/GlobalContextComponent";

import { NavLink, useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { TbClockHour3 } from "react-icons/tb";
import { TbListNumbers } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";

export default function Booked() {
    let gc = useContext(GlobalContext);
    let navigate = useNavigate();

    let [booked, setBooked] = useState([]);

    useEffect(function () {
        if (!gc?.rentSpace?.renterId) {
            navigate("/rent-space");
            return;
        }

        (async () => {
            let res = await fetchData("POST", "/api/rent-space/booked", {
                renterId: gc?.rentSpace?.renterId,
            });

            if (!res?.isSuccess) return;

            setBooked(res.data);
        })();
    }, []);

    return (
        <section className="flex justify-center h-[100vh] pt-[60px] pb-[20px] px-[100px] border">
            <div className="w-full h-full">
                <h1 className="my-3 text-xl font-bold text-center">
                    Booked Parking
                </h1>
                {booked?.map((e, i) => {
                    return (
                        <div className="flex flex-wrap items-center justify-between gap-10 p-5 my-2 text-white rounded bg-c1">
                            <div className="flex flex-col gap-2 grow">
                                <div className="flex items-center gap-3">
                                    <FaUser className="inline-block w-5 h-5" />{" "}
                                    {e.fullName}
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaCarAlt className="inline-block w-5 h-6" />{" "}
                                    {e.spaceName}
                                </div>
                                <div className="flex items-center gap-3">
                                    <MdOutlineEmail className="inline-block w-5 h-6" />
                                    {e.email}
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaPhone className="inline-block w-4 h-5 mx-0.5" />{" "}
                                    {e.phoneNo}
                                </div>
                            </div>
                            <div className="text-center grow">
                                {new Date(e.from).toLocaleString()} - To -{" "}
                                {new Date(e.to).toLocaleString()}
                            </div>
                            <div className="flex flex-col items-end gap-2 grow">
                                <div className="flex flex-row-reverse items-center gap-3">
                                    <FaUser className="inline-block w-5 h-5" />
                                    {gc?.rentSpace?.userName}
                                </div>
                                <div className="flex flex-row-reverse items-center gap-3">
                                    <TbClockHour3 className="inline-block w-5 h-5" />
                                    {e.ratePerHour} / Hour
                                </div>
                                <div className="flex flex-row-reverse items-center gap-3">
                                    <FaIndianRupeeSign className="inline-block w-5 h-5" />
                                    {/* total amount */}
                                    {((Date.parse(e.to) - Date.parse(e.from)) /
                                        (1000 * 60 * 60)) *
                                        e.ratePerHour}{" "}
                                    /-
                                </div>

                                <div className="flex flex-row-reverse items-center gap-3">
                                    <TbListNumbers className="inline-block w-5 h-5" />
                                    {e.vehicleNo}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
