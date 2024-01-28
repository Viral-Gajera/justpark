import React from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../form/Button";
import fetchData from "../../util/fetchData";
import { GlobalContext } from "../../util/GlobalContextComponent";

export default function Login() {
    let gc = useContext(GlobalContext);
    let navigate = useNavigate();

    const [formDetails, setFormDetails] = React.useState({});

    async function handlerLogin() {
        let res = await fetchData("POST", "/api/admin/login", {
            ...formDetails,
        });

        if (res?.isSuccess) {
            toast.success(res.message);
            gc.setManageSpacePending(res.data);
            navigate("dashboard");
        } else {
            toast.error(res.message);
        }
    }

    return (
        <section className=" h-[100vh] bg-1 bg-c1">
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center gap-5 [&_input]:w-[350px] bg-white p-5 py-10 rounded-lg">
                    <h1 className="text-xl font-bold">Login</h1>
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
                </div>
            </div>
        </section>
    );
}
