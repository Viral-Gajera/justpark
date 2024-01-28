import React from "react";
import toast from "react-hot-toast";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Map from "./Map";
import Button from "../form/Button";
import fetchData from "../../util/fetchData";
import { GlobalContext } from "../../util/GlobalContextComponent";
import Images from "../admin/Images";

export default function SignUp() {
    const gc = useContext(GlobalContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [formDetails, setFormDetails] = useState({});
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const [readOnly, setReadOnly] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(function () {
        if (searchParams.get("action") == "view") {
            setReadOnly(true);
        }

        if (searchParams.get("action") == "edit") {
            setReadOnly(false);
            setEdit(true);
        }

        if (gc?.manageSpace) {
            setFormDetails(gc.manageSpace);
            console.log(gc.manageSpace);
        }
    }, []);

    function validation() {
        if (!latitude || !longitude) {
            toast.error("Please select location");
            return false;
        }
        return true;
    }

    async function handlerSubmit(e) {
        e.preventDefault();

        if (readOnly) {
            navigate("/manage-space/dashboard");
            return;
        }

        let files = e.target[0].files;

        if (!validation()) return;

        if (!files.length) {
            toast.error("Please select image file");
            return;
        }

        // Sending Images
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
        }

        let response = await fetch(
            `${process.env.REACT_APP_BASEURL}/api/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        response = await response.json();

        if (!response?.isSuccess) return;

        // Sending Form Details
        let res = await fetchData("POST", "/api/manage-space/add-user", {
            ...formDetails,
            fileUrls: response.data.fileUrl,
            latitude,
            longitude,
            edit,
        });

        if (res?.isSuccess) {
            toast.success("Account created successfully");
            navigate("/manage-space/dashboard");
            gc?.setManageSpace({
                ...res.data,
                status: 0,
            });
        }
    }

    return (
        <section className="h-[100vh] overflow-auto bg-fixed  bg-1 bg-c1 scroll-parent">
            {/* Personal Details */}
            <div
                className="flex items-center justify-center w-full h-full scroll-child"
                id="personal-details"
            >
                <div className="flex flex-col items-center justify-center gap-5 [&_input]:w-[350px] bg-white p-5 py-10 rounded-lg">
                    <h1 className="text-xl font-bold">Your Personal details</h1>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full max-w-xs input input-bordered"
                            value={formDetails.fullName}
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    fullName: e.target.value,
                                })
                            }
                            readOnly={readOnly}
                        />
                        <input
                            type="number"
                            placeholder="Phone No"
                            className="w-full max-w-xs input input-bordered"
                            value={formDetails.phoneNo}
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    phoneNo: e.target.value,
                                })
                            }
                            readOnly={readOnly}
                        />

                        <input
                            type="text"
                            placeholder="Email Address"
                            className="w-full max-w-xs input input-bordered"
                            value={formDetails.email}
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    email: e.target.value,
                                })
                            }
                            readOnly={readOnly}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full max-w-xs input input-bordered"
                            value={formDetails.password}
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    password: e.target.value,
                                })
                            }
                            readOnly={readOnly}
                        />

                        <input
                            type="text"
                            placeholder="Space Name"
                            className="min-w-full col-span-2 border input input-bordered"
                            value={formDetails.spaceName}
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    spaceName: e.target.value,
                                })
                            }
                            readOnly={readOnly}
                        />
                    </div>
                    <a href="#space-details" className="block w-full">
                        <Button className="w-full py-[10px] text-white rounded-lg bg-c3 font-bold">
                            Next
                        </Button>
                    </a>
                </div>
            </div>

            {/* Space Details */}
            <div
                className="flex items-center justify-center w-full h-full scroll-child"
                id="space-details"
            >
                <div className="flex flex-col items-center justify-center gap-5 [&_input]:w-[350px] bg-white p-5 py-10 rounded-lg">
                    <h1 className="text-xl font-bold">Space details</h1>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <label htmlFor="" className="flex flex-col">
                            <div className="mb-1 ml-1">From</div>
                            <input
                                type="time"
                                placeholder="Full Name"
                                className="w-full max-w-xs input input-bordered"
                                value={formDetails.from}
                                onChange={(e) =>
                                    setFormDetails({
                                        ...formDetails,
                                        from: e.target.value,
                                    })
                                }
                                readOnly={readOnly}
                            />
                        </label>
                        <label htmlFor="" className="flex flex-col">
                            <div className="mb-1 ml-1">To</div>
                            <input
                                type="time"
                                placeholder="Full Name"
                                className="w-full max-w-xs input input-bordered"
                                value={formDetails.to}
                                onChange={(e) =>
                                    setFormDetails({
                                        ...formDetails,
                                        to: e.target.value,
                                    })
                                }
                                readOnly={readOnly}
                            />
                        </label>
                        <input
                            type="number"
                            placeholder="Max Space"
                            className="w-full max-w-xs input input-bordered"
                            value={formDetails.maxSpace}
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    maxSpace: e.target.value,
                                })
                            }
                            readOnly={readOnly}
                        />
                        <input
                            type="text"
                            placeholder="Rate Per Hour"
                            className="w-full max-w-xs input input-bordered"
                            value={formDetails.ratePerHour}
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    ratePerHour: e.target.value,
                                })
                            }
                            readOnly={readOnly}
                        />
                    </div>
                    <a href="#location" className="block w-full">
                        <Button className="w-full py-[10px] text-white rounded-lg bg-c3 font-bold">
                            Next
                        </Button>
                    </a>
                </div>
            </div>

            {/* Map */}
            <div
                className="flex items-center justify-center w-full h-full scroll-child"
                id="location"
            >
                <Map
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    latitude={gc?.manageSpace?.latitude}
                    longitude={gc?.manageSpace?.longitude}
                    readOnly={readOnly}
                />
            </div>

            {/* Image */}
            <div
                className="flex items-center justify-center w-full h-full scroll-child"
                id="image"
            >
                <div className="flex flex-col items-center justify-center gap-5 p-5 py-10 bg-white rounded-lg ">
                    <h1 className="text-xl font-bold">Parking Image</h1>

                    <form onSubmit={handlerSubmit}>
                        <div className="w-full ">
                            <input
                                type="file"
                                placeholder="Full Name"
                                className="w-full p-2 border border-gray-300 rounded"
                                multiple
                                accept="image/*"
                                readOnly={readOnly}
                            />
                        </div>

                        <div
                            className={`mt-3 w-[70vw] h-[50vh] ${
                                readOnly ? " block " : " hidden "
                            } `}
                        >
                            <Images
                                fileUrls={JSON.parse(
                                    gc?.manageSpace?.fileUrls || "[]"
                                )}
                            />
                        </div>

                        <Button
                            className="w-full py-[10px] text-white rounded-lg bg-c3 font-bold mt-5"
                            type="submit"
                        >
                            Complete
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
