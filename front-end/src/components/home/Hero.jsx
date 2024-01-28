import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../form/Button";

export default function Hero() {
    return (
        <section className="py-16 md:p-16 md:py-24 bg-c1">
            <div className="flex flex-wrap-reverse justify-around gap-20 p-1 bg-cover bg-1">
                {/* Content */}
                <div className="text-white w-[500px] flex flex-col justify-evenly gap-10 lg:gap-0">
                    <h1 className="text-5xl font-bold text-center">
                        Find Amazing Parking Spaces Near You
                    </h1>
                    <p className="text-center">
                        Our huge network of bookable parking spaces & driveways
                        gets you closer to where you need to be. By reserving
                        your parking, you'll save time & money on all your
                        journeys, whether it's your daily commute, an evening
                        gig or a weekend away.
                    </p>

                    <NavLink to="/rent-space">
                        <Button className=" w-[50%] mx-auto p-1 bg-c2 font-light">
                            Find NearBy Parking Space Now
                        </Button>
                    </NavLink>
                </div>

                {/* Image */}
                <div className="">
                    <img
                        src="assets/images/hero-img.svg"
                        className="max-h-[450px]"
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
}
