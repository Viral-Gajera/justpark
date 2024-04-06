import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import fetchData from "../../util/fetchData";
import { GlobalContext } from "../../util/GlobalContextComponent";

import moment from "moment";
import Timeline, { TodayMarker, CustomMarker } from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

import Nav from "./Nav";

let commonAttr = {
    canMove: false,
    canResize: false,
    canChangeGroup: false,
    itemProps: {
        style: {
            background: "#1e345f",
            border: "0px",
            textAlign: "center",
        },
    },
};

function extractTimeFromDate(dateString) {
    // Parse the input date string
    const date = new Date(Date.parse(dateString));

    // Extract the time components
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Construct the time string
    const timeString = `${hours}:${minutes}:${seconds}`;

    return timeString;
}

export default function Dashboard() {
    const gc = useContext(GlobalContext);
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([{ id: 1, title: "Spot 1" }]);
    const [rentDetails, setRentDetails] = useState([]);
    const [selectedRentDetail, setSelectedRentDetail] = useState({});
    const [totalBokingHours, setTotalBokingHours] = useState(0);

    useEffect(() => {
        if (!gc.manageSpace.providerId) {
            navigate("/mange-space");
            return;
        }

        if (gc.manageSpace.status != 1) {
            document.getElementById("status_modal").showModal();
        }

        (async function () {
            let groupsTemp = [];

            for (let i = 0; i < gc?.manageSpace?.maxSpace; i++) {
                groupsTemp.push({
                    id: i,
                    title: `Spot ${i + 1}`,
                });
            }

            setGroups(groupsTemp);

            let res = await fetchData(
                "POST",
                "/api/manage-space/get-rent-details",
                {
                    providerId: gc?.manageSpace?.providerId,
                }
            );

            if (!res?.isSuccess) return;

            console.log(res);

            setRentDetails(res?.data);

            let itemsTemp = [];

            setTotalBokingHours(0);

            for (let i = 0; i < res?.data?.length; i++) {
                itemsTemp.push({
                    id: i + 1,
                    group: res?.data[i]?.spotIndex,
                    title: (
                        <div
                            onClick={() => {
                                console.log(res?.data[i]);
                                setSelectedRentDetail(res?.data[i]);
                                document
                                    .getElementById("details_modal")
                                    .showModal();
                            }}
                            title="Vechile No, Click to show more details"
                            className="text-nowrap overflow-hidden text-ellipsis"
                        >
                            {res?.data[i]?.vehicleNo}
                        </div>
                    ),
                    start_time: Date.parse(res?.data[i]?.from),
                    end_time: Date.parse(res?.data[i]?.to),
                    ...commonAttr,
                });

                setTotalBokingHours((old) => {
                    return (
                        old +
                        Number(
                            (
                                (Date.parse(res?.data[i]?.to) -
                                    Date.parse(res?.data[i]?.from)) /
                                (1000 * 60 * 60)
                            ).toFixed(2)
                        )
                    );
                });
            }

            console.log(itemsTemp);

            setItems(itemsTemp);
        })();
    }, []);

    return (
        <section>
            <style jsx>{`
                .rct-item {
                    overflow: hidden;
                }
            `}</style>

            <section>
                <Nav />
            </section>

            <section className="mx-5 md:mx-[150px] h-[100vh]">
                <div className="flex flex-col items-center justify-center h-full max-w-full gap-16">
                    <div className="max-w-full p-5 rounded shadow-1">
                        <Timeline
                            groups={groups}
                            items={items}
                            defaultTimeStart={moment().add(-5, "hour")}
                            defaultTimeEnd={moment().add(24, "hour")}
                            className="max-w-[100%] border border-gray-400 border-b-0"
                        >
                            <TodayMarker />
                            {/* <CustomMarker date={Date.now()} /> */}
                        </Timeline>
                    </div>
                    <div className="flex flex-wrap justify-center w-full gap-[8vw]">
                        <div className="w-[150px] h-[100px] md:w-[200px] md:h-[130px] shadow-1 rounded flex flex-col items-center justify-center gap-2">
                            <div className="text-lg font-semibold">
                                Total Booking
                            </div>
                            <div className="text-lg">{rentDetails.length}</div>
                        </div>
                        <div className="w-[150px] h-[100px] md:w-[200px] md:h-[130px] shadow-1 rounded flex flex-col items-center justify-center gap-1">
                            <div className="p-0 text-lg font-semibold text-center">
                                Total Booking <br /> Hours
                            </div>
                            <div className="text-lg">{totalBokingHours} h</div>
                        </div>
                        <div className="w-[150px] h-[100px] md:w-[200px] md:h-[130px] shadow-1 rounded flex flex-col items-center justify-center gap-2">
                            <div className="text-lg font-semibold">
                                Rate Per Hour
                            </div>
                            <div className="text-lg">
                                {gc?.manageSpace?.ratePerHour}/-
                            </div>
                        </div>
                        <div className="w-[150px] h-[100px] md:w-[200px] md:h-[130px] shadow-1 rounded flex flex-col items-center justify-center gap-2">
                            <div className="text-lg font-semibold">
                                Total Earning
                            </div>
                            <div className="text-lg">
                                {(
                                    totalBokingHours *
                                        gc?.manageSpace?.ratePerHour -
                                    totalBokingHours *
                                        gc?.manageSpace?.ratePerHour *
                                        0.1
                                ).toFixed(2)}
                                /-
                            </div>
                            <div className="text-xs text-center">
                                * After 10% changed <br /> by platform
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* If status is pending */}
            {/* Show warning */}
            <section>
                <dialog id="status_modal" className=" modal">
                    <div className="w-11/12 max-w-5xl text-white bg-c1 modal-box">
                        <p className="py-2 text-xl text-center">
                            {gc.manageSpace.status == -1
                                ? "Your account is rejected, Please create new account"
                                : "Your account will be verified by Admin."}
                        </p>
                        <div>
                            <div
                                className="block w-full text-xs text-center cursor-pointer"
                                onClick={() => {
                                    gc.setManageSpace({});
                                    navigate("/");
                                }}
                            >
                                Go to Home
                            </div>
                        </div>
                    </div>
                </dialog>
            </section>

            <section>
                <dialog id="details_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">
                            Parking Rentor Details
                        </h3>
                        <div className="grid grid-cols-2 gap-5 py-4 font-semibold">
                            <label htmlFor="" className="">
                                <span>User Name</span>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs mt-1 text-gray-500 input input-bordered"
                                    value={selectedRentDetail?.userName}
                                    readOnly
                                />
                            </label>
                            <label htmlFor="" className="">
                                <span>Email</span>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs mt-1 text-gray-500 input input-bordered"
                                    value={selectedRentDetail?.email}
                                    readOnly
                                />
                            </label>
                            <label htmlFor="" className="">
                                <span>Phone Number</span>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs mt-1 text-gray-500 input input-bordered"
                                    value={selectedRentDetail?.phoneNo}
                                    readOnly
                                />
                            </label>
                            <label htmlFor="" className="">
                                <span>Vehicle No</span>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs mt-1 text-gray-500 input input-bordered"
                                    value={selectedRentDetail?.vehicleNo}
                                    readOnly
                                />
                            </label>
                            <label htmlFor="" className="">
                                <span>Time From</span>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs mt-1 text-gray-500 input input-bordered"
                                    value={extractTimeFromDate(
                                        selectedRentDetail?.from
                                    )}
                                    readOnly
                                />
                            </label>
                            <label htmlFor="" className="">
                                <span>Time To</span>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs mt-1 text-gray-500 input input-bordered"
                                    value={extractTimeFromDate(
                                        selectedRentDetail?.to
                                    )}
                                    readOnly
                                />
                            </label>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </section>
        </section>
    );
}
