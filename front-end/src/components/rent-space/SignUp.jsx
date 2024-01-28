import React from "react";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Button from "../form/Button";
import fetchData from "../../util/fetchData";
import { GlobalContext } from "../../util/GlobalContextComponent";

export default function SignUp() {
    const [formDetails, setFormDetails] = useState({});
    const navigate = useNavigate();
    const gc = useContext(GlobalContext);

    async function handlerSubmit() {
        // Sending Form Details
        let res = await fetchData("POST", "/api/rent-space/add-user", {
            ...formDetails,
        });

        if (res?.isSuccess) {
            toast.success("Account created successfully");
            navigate("/rent-space/dashboard");
            gc?.setRentSpace({
                ...res.data,
            });
        }
    }

    return (
        <section className=" h-[100vh] bg-1 bg-c1 bg-fixed overflow-auto">
            {/* Personal Details */}
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center gap-5 [&_input]:w-[350px] bg-white p-5 py-10 rounded-lg">
                    <h1 className="text-xl font-bold">Your Personal details</h1>
                    <div className="grid grid-cols-1 gap-5">
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
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="w-full max-w-xs input input-bordered"
                            value={formDetails.phoneNo}
                            onChange={(e) =>
                                setFormDetails({
                                    ...formDetails,
                                    phoneNo: e.target.value,
                                })
                            }
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
                        />
                    </div>
                    <Button
                        className="w-full py-[10px] text-white rounded-lg bg-c3 font-bold"
                        onClick={handlerSubmit}
                    >
                        Create Account
                    </Button>
                </div>
            </div>
        </section>
    );
}
