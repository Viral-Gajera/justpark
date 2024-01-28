import { useContext } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Solutions from "../components/home/Solutions";

export default function Home() {
    return (
        <section>
            {/* Navbar */}
            <section>
                <Navbar />
            </section>

            {/* Hero */}
            <section>
                <Hero />
            </section>

            {/* Features */}
            <section>
                <Features />
            </section>

            {/* Solutions */}
            <section>
                <Solutions />
            </section>

            {/* Footer */}
            <section>
                <Footer />
            </section>
        </section>
    );
}
