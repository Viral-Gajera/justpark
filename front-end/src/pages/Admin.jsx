import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Login from "../components/admin/Login";
import Dashboard from "../components/admin/Dashboard";

export default function Admin() {
    return (
        <section>
            {/* Navbar */}
            <section>
                <Navbar />
            </section>

            {/* Login & Dashboard */}
            <section>
                <Routes>
                    <Route path="" element={<Login />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Routes>
            </section>
        </section>
    );
}
