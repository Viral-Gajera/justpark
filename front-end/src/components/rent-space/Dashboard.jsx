import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Nav from "./Nav";
import Book from "./Book";
import Booked from "./Booked";
import History from "./History";

export default function Dashboard() {
    return (
        <section>
            <section>
                <Nav />
            </section>

            <section>
                <Routes>
                    <Route path="" element={<Book />} />
                    <Route path="booked" element={<Booked />} />
                    <Route path="history" element={<History />} />
                </Routes>
            </section>
        </section>
    );
}
