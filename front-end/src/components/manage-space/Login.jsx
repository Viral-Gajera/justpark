import React from "react";
import toast from "react-hot-toast";
import { useEffect, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Button from "../form/Button";
import fetchData from "../../util/fetchData";
import { GlobalContext } from "../../util/GlobalContextComponent";

export default function Login() {
    let gc = useContext(GlobalContext);
    let navigate = useNavigate();

    const [formDetails, setFormDetails] = useState({});

    useEffect(function () {
        if (gc?.manageSpace?.email && gc?.manageSpace?.password) {
            navigate("dashboard");
        }
    }, []);

    function validate() {
        const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/;

        if (!formDetails.email) {
            toast.error("Email is required");
            return false;
        }
        if (!emailRegex.test(formDetails.email)) {
            toast.error("Invalid Email");
            return false;
        }
        if (!formDetails.password) {
            toast.error("Password is required");
            return false;
        }
        return true;
    }

    async function handlerLogin() {
        if (!validate()) return;

        let res = await fetchData("POST", "/api/manage-space/login", {
            ...formDetails,
        });

        if (res?.isSuccess) {
            toast.success(res.message);
            gc.setManageSpace(res.data);
            navigate("dashboard");
        } else {
            toast.error(res?.message);
        }
    }

    return (
        <section className="h-[100vh] bg-1 bg-c1">
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center gap-5 [&_input]:w-[350px] bg-white p-5 py-10 rounded-lg">
                    <div className="w-full text-center">
                        <h1 className="relative z-10 text-xl font-bold">
                            Login
                        </h1>
                        {/* <div className="translate-y-[15px] border-[1px] border-gray-100"></div> */}
                        <h1 className="relative inline-block px-3 text-xs text-gray-300 bg-white">
                            Manage Space
                        </h1>
                    </div>
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

                    <Button
                        className="w-full py-[10px] text-white rounded-lg bg-c3 font-bold"
                        onClick={handlerLogin}
                    >
                        Login
                    </Button>

                    <div>
                        Dont Have Account ?
                        <NavLink to="details" className="ml-2 underline">
                            Sign Up
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
