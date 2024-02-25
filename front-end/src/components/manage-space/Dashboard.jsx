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

export default function Dashboard() {
    const gc = useContext(GlobalContext);
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([{ id: 1, title: "Spot 1" }]);
    const [rentDetails, setRentDetails] = useState([]);
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
                                alert("Detail logged into console");
                                console.log(res?.data[i]);
                            }}
                            title="Vechile No, Click to show more details"
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

            setItems(itemsTemp);
        })();
    }, []);

    return (
        <section>
            <section>
                <Nav />
            </section>

            <section className="mx-[150px] mt-[57px] h-[90vh]">
                <div className="flex flex-col items-center justify-center h-full max-w-full gap-16">
                    <div className="max-w-full p-5 rounded shadow-1">
                        <Timeline
                            groups={groups}
                            items={items}
                            defaultTimeStart={moment().add(-5, "hour")}
                            defaultTimeEnd={moment().add(24, "hour")}
                            className="max-w-[100%] border"
                        >
                            <TodayMarker />
                            {/* <CustomMarker date={Date.now()} /> */}
                        </Timeline>
                    </div>
                    <div className="flex flex-wrap justify-between w-full">
                        <div className="w-[200px] h-[150px] shadow-1 rounded flex flex-col items-center justify-center gap-2">
                            <div className="text-xl font-bold">
                                Total Booking
                            </div>
                            <div className="text-lg font-semibold">
                                {rentDetails.length}
                            </div>
                        </div>
                        <div className="w-[200px] h-[150px] shadow-1 rounded flex flex-col items-center justify-center gap-2">
                            <div className="p-2 text-xl font-bold text-center">
                                Total Booking Hours
                            </div>
                            <div className="text-lg font-semibold">
                                {totalBokingHours} h
                            </div>
                        </div>
                        <div className="w-[200px] h-[150px] shadow-1 rounded flex flex-col items-center justify-center gap-2">
                            <div className="text-xl font-bold">
                                Rate Per Hour
                            </div>
                            <div className="text-lg font-semibold">
                                {gc?.manageSpace?.ratePerHour}/-
                            </div>
                        </div>
                        <div className="w-[200px] h-[150px] shadow-1 rounded flex flex-col items-center justify-center gap-2">
                            <div className="text-xl font-bold">
                                Total Earning
                            </div>
                            <div className="text-lg font-semibold">
                                {(
                                    totalBokingHours *
                                    gc?.manageSpace?.ratePerHour
                                ).toFixed(2)}
                                /-
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
        </section>
    );
}
