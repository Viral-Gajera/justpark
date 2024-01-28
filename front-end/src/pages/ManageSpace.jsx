import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Login from "../components/manage-space/Login";
import SignUp from "../components/manage-space/SignUp";
import Dashboard from "../components/manage-space/Dashboard";

export default function ManageSpace() {
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
                    <Route path="dashboard" element={<Dashboard />} />
                </Routes>
            </section>
        </section>
    );
}
