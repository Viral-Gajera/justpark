import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Login from "../components/rent-space/Login";
import SignUp from "../components/rent-space/SignUp";
import Dashboard from "../components/rent-space/Dashboard";

export default function RentSpance() {
    return (
        <section>
            {/* Navbar */}
            <section>
                <Navbar />
            </section>

            {/* Login & Sign Up & Dashboard */}
            <section>
                <Routes>
                    <Route path="" element={<Login />} />
                    <Route path="details" element={<SignUp />} />
                    <Route path="dashboard/*" element={<Dashboard />} />
                </Routes>
            </section>
        </section>
    );
}
