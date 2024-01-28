import React from "react";

import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fetchData from "../../util/fetchData";
import { GlobalContext } from "../../util/GlobalContextComponent";

import { RxCross1 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";

import Map from "./Map";
import Images from "./Images";

export default function Dashboard() {
    let gc = useContext(GlobalContext);
    let navigate = useNavigate();

    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);
    let [fileUrls, setFileUrls] = useState([]);

    useEffect(() => {
        if (!gc?.manageSpacePending) {
            navigate("/admin");
        }
    }, []);

    async function handlerChangeStatus(id, status) {
        let res = await fetchData("POST", "/api/admin/change-status", {
            id: id,
            status: status,
        });

        if (res?.isSuccess) {
            if (status == 1) {
                toast.success("Account varified");
            } else if (status == -1) {
                toast.success("Account rejected");
            }

            gc.setManageSpacePending((old) => {
                return old?.filter((e) => e.providerId != id);
            });
        }
    }

    function showMapModal(latitude, longitude) {
        setLatitude(latitude);
        setLongitude(longitude);

        document.getElementById("map_modal").showModal();
    }

    function showImageModal(fileUrls) {
        setFileUrls(JSON.parse(fileUrls));
        document.getElementById("image_modal").showModal();
    }

    return (
        <section className="mt-[60px]">
            {/* Table */}
            <div className="m-5 border rounded">
                <div className="overflow-x-auto">
                    <table className="table [&_*]:whitespace-nowrap">
                        {/* head */}
                        <thead>
                            <tr className="bg-base-200">
                                <th></th>
                                <th>User Name</th>
                                <th>Space Name</th>
                                <th>Email</th>
                                <th>Phone No</th>
                                <th>Timing</th>
                                <th>Max Space</th>
                                <th>Rate Per Hour</th>
                                <th>Location</th>
                                <th>Images</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {gc.manageSpacePending.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>{e.fullName}</td>
                                        <td>{e.spaceName}</td>
                                        <td>{e.email}</td>
                                        <td>{e.phoneNo}</td>
                                        <td>
                                            {e.from} to {e.to}
                                        </td>
                                        <td>{e.maxSpace}</td>
                                        <td>{e.ratePerHour}</td>
                                        <td
                                            onClick={() =>
                                                showMapModal(
                                                    e.latitude,
                                                    e.longitude
                                                )
                                            }
                                        >
                                            <span className="cursor-pointer hover:underline">
                                                Show
                                            </span>
                                        </td>
                                        <td
                                            onClick={() =>
                                                showImageModal(e.fileUrls)
                                            }
                                        >
                                            <span className="cursor-pointer hover:underline">
                                                Show
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-3">
                                                <div
                                                    className="p-1 text-white bg-green-400 rounded active:bg-green-600"
                                                    onClick={() =>
                                                        handlerChangeStatus(
                                                            e.providerId,
                                                            1
                                                        )
                                                    }
                                                >
                                                    <IoCheckmarkOutline />
                                                </div>
                                                <div
                                                    className="p-1 text-white bg-red-400 rounded active:bg-red-600"
                                                    onClick={() =>
                                                        handlerChangeStatus(
                                                            e.providerId,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <RxCross1 />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Map Modal */}
            <dialog id="map_modal" className="modal">
                <div className="w-11/12 max-w-5xl h-[70vh] modal-box">
                    <Map latitude={latitude} longitude={longitude} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Image Modal */}
            <dialog id="image_modal" className="modal">
                <div className="w-11/12 max-w-5xl h-[70vh] modal-box overflow-hidden">
                    <Images fileUrls={fileUrls} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </section>
    );
}
