import React from "react";

import { IoSpeedometer } from "react-icons/io5";
import { HiPaperAirplane } from "react-icons/hi";
import { PiTwitterLogoFill } from "react-icons/pi";

export default function Features() {
    return (
        <div>
            <div className="flex flex-wrap justify-center gap-16 py-20">
                {/* Card */}
                <div className="flex gap-3 ">
                    <div>
                        <HiPaperAirplane className="text-5xl text-c3" />
                    </div>
                    <div className="max-w-[250px]">
                        <div className="font-bold">Wherever, whenever</div>
                        <div className="text-sm">
                            Choose from millions of spaces across the UK Find
                            your best option for every car journey
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div className="flex gap-3 ">
                    <div>
                        <PiTwitterLogoFill className="text-5xl text-c3" />
                    </div>
                    <div className="max-w-[250px]">
                        <div className="font-bold">Peace of mind</div>
                        <div className="text-sm">
                            View information on availability, price and
                            restrictions Reserve in advance at over 45,000+
                            locations
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div className="flex gap-3 ">
                    <div>
                        <IoSpeedometer className="text-5xl text-c3" />
                    </div>
                    <div className="max-w-[250px]">
                        <div className="font-bold">Seamless experience</div>
                        <div className="text-sm">
                            Pay for JustPark spaces via the app or website
                            Follow easy directions and access instructions
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
