import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

import Images from "../admin/Images";

import Button from "../form/Button";
import fetchData from "../../util/fetchData";
import customMarkerIcon from "../../images/location marker.png";
import { GlobalContext } from "../../util/GlobalContextComponent";

import { FaUser } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";

import { loadStripe } from "@stripe/stripe-js";

export default function Book() {
    let gc = useContext(GlobalContext);
    let navigate = useNavigate();

    const map = useRef(null);
    const mapRef = useRef(null);
    const routingControlRef = useRef(null);
    const markerGroup = useRef(L.featureGroup());

    const [formDetails, setFormDetails] = useState({});
    const [input, setInput] = useState();
    const [markerDetails, setMarkerDetails] = useState({});
    const [center, setCenter] = useState([40.7128, -74.006]);

    function validate() {
        if (!formDetails.from) {
            toast.error("From Time is required");
            return false;
        }
        if (!formDetails.to) {
            toast.error("To Time is required");
            return false;
        }
        let fromtime = Date.parse(formDetails.from);
        let totime = Date.parse(formDetails.to);

        if (totime <= fromtime) {
            toast.error("To Time must be greater then From Time");
            return false;
        }

        if (!formDetails.vehicleNo) {
            toast.error("Please enter vehicle Number");
            return false;
        }

        return true;
    }

    function validateTime() {
        if (!formDetails.from) {
            toast.error("From Time is required");
            return false;
        }
        if (!formDetails.to) {
            toast.error("To Time is required");
            return false;
        }
        let fromtime = Date.parse(formDetails.from);
        let totime = Date.parse(formDetails.to);

        if (totime <= fromtime) {
            toast.error("To Time must be greater then From Time");
            return false;
        }

        return true;
    }

    function verifyDetails() {
        console.log(formDetails);
        if (!validate()) return;

        let a = document.createElement("a");
        a.href = "#map";
        a.click();
    }

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            map.current = L.map(mapRef.current).setView(center, 13);

            const tileLayer = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {}
            );

            tileLayer.addTo(map.current);

            markerGroup.current.addTo(map.current);

            if (formDetails.from && formDetails.to && validateTime()) {
                addMarker(center);
            }

            return () => {
                map.current.remove();
            };
        }
    }, [center, formDetails.from, formDetails.to]);

    async function handleUserEnteredLocation() {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${input}&format=json`
            );
            if (response.ok) {
                const locationData = await response.json();
                if (locationData.length > 0) {
                    const userLocation = locationData[0];
                    const userLatitude = parseFloat(userLocation.lat);
                    const userLongitude = parseFloat(userLocation.lon);

                    setCenter([userLatitude, userLongitude]);

                    // Clear any previous routes
                    if (routingControlRef.current) {
                        map.current.removeControl(routingControlRef.current);
                    }

                    // Clear existing markers
                    markerGroup.current.clearLayers();
                } else {
                    toast.error("Location not found");
                }
            } else {
                console.error("Error fetching location data");
            }
        } catch (error) {
            console.error("Error handling user-entered location:");
        }
    }

    async function getUserLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                setCenter([userLatitude, userLongitude]);

                // Clear any previous routes
                if (routingControlRef.current) {
                    map.current.removeControl(routingControlRef.current);
                }
            });
        } else {
            console.error("Geolocation is not available in this browser.");
        }
    }

    async function addMarker(center) {
        let res = await fetchData("POST", "/api/rent-space/get-marker", {
            latitude: center[0],
            longitude: center[1],
            from: formDetails.from || "2021-09-01T00:00",
            to: formDetails.to || "2021-09-02T00:00",
        });

        if (!res?.isSuccess) {
            toast.error(res?.message || "Error fetching marker data");
            return;
        }

        toast.success("Marker fetched");

        console.log(res.data);

        markerGroup.current.clearLayers();

        res?.data?.forEach((e, i) => {
            // Add new marker

            const customIcon = L.icon({
                iconUrl: customMarkerIcon,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
            });

            const marker = L.marker([e.latitude, e.longitude], {
                icon: customIcon,
            });

            marker.on("click", () => {
                setMarkerDetails(e);
                document.getElementById("marker_modal").showModal();
            });

            markerGroup.current.addLayer(marker);
        });
    }

    async function bookTicket() {
        let res = await fetchData("POST", "/api/rent-space/book-ticket", {
            providerId: markerDetails?.providerId,
            renterId: gc?.rentSpace?.renterId,
            spotIndex: markerDetails?.availableSpotIndex,
            from: formDetails?.from,
            to: formDetails?.to,
            vehicleNo: formDetails?.vehicleNo,
        });

        if (!res?.isSuccess) return;

        toast.success("Ticket booked");

        navigate("/rent-space/dashboard/booked");
    }

    return (
        <section className="scroll-parent">
            {/* Form */}
            <div className="flex items-center justify-center p-20 bg-c1 scroll-child">
                <div className="flex flex-col items-center justify-center gap-5 [&_input]:w-[250px] md:[&_input]:w-[350px] [&_input]:max-w-[400px] bg-white p-5 py-10 rounded-lg">
                    <h1 className="text-xl font-bold">Enter Details</h1>
                    <div className="grid grid-cols-1 gap-5">
                        <label htmlFor="" className="flex flex-col">
                            <div className="mb-1 ml-1 font-semibold">
                                From Time
                            </div>
                            <input
                                type="datetime-local"
                                className="w-full input input-bordered"
                                value={formDetails.from}
                                onChange={(e) => {
                                    setFormDetails({
                                        ...formDetails,
                                        from: e.target.value,
                                    });
                                }}
                            />
                        </label>
                        <label htmlFor="" className="flex flex-col">
                            <div className="mb-1 ml-1 font-semibold">
                                To Time
                            </div>
                            <input
                                type="datetime-local"
                                className="w-full input input-bordered"
                                value={formDetails.to}
                                onChange={(e) => {
                                    setFormDetails({
                                        ...formDetails,
                                        to: e.target.value,
                                    });
                                }}
                            />
                        </label>
                        <label htmlFor="" className="flex flex-col">
                            <div className="mb-1 ml-1 font-semibold">
                                Vechicle No
                            </div>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                placeholder="Vehicle Number"
                                value={formDetails.vehicleNo}
                                onChange={(e) => {
                                    setFormDetails({
                                        ...formDetails,
                                        vehicleNo: e.target.value,
                                    });
                                }}
                            />
                        </label>
                        {/* <input
                            type="text"
                            placeholder="Vehicle Number"
                            className="w-full min-w-full input input-bordered"
                            value={formDetails.vehicleNo}
                            onChange={(e) => {
                                setFormDetails({
                                    ...formDetails,
                                    vehicleNo: e.target.value,
                                });
                            }}
                        /> */}
                    </div>

                    <Button
                        className="w-full py-[10px] text-white rounded-lg bg-c3 font-bold"
                        onClick={verifyDetails}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Map */}
            <div id="map" className="relative w-full mx-auto scroll-child">
                <div className="h-[140px] absolute top-[0px] z-[999] flex items-center justify-center w-full">
                    <div className="flex flex-wrap gap-2 p-5 lg:flex-nowrap bg-c1">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full input input-bordered"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            className="lg:w-[150px] py-[10px] text-white rounded-lg bg-c3 font-bold grow"
                            onClick={handleUserEnteredLocation}
                        >
                            Search
                        </Button>
                        <Button
                            className="lg:w-[300px] py-[10px] text-white rounded-lg bg-c3 font-bold grow"
                            onClick={getUserLocation}
                        >
                            Use Current Location
                        </Button>
                    </div>
                </div>
                <div ref={mapRef} className="absolute w-full h-full "></div>
            </div>

            {/* Marker Modal */}
            <dialog id="marker_modal" className="modal">
                <div className="w-11/12 max-w-5xl h-[80vh] modal-box overflow-hidden border flex flex-col justify-around">
                    {/* Space Provider Details */}
                    <div className="flex justify-around py-1 text-lg font-semibold text-white border rounded bg-c3">
                        <div
                            className="flex items-center gap-2"
                            title="Parking ower name"
                        >
                            <div>
                                <FaUser />
                            </div>
                            <div>{markerDetails.fullName}</div>
                        </div>
                        <div
                            className="flex items-center gap-2"
                            title="Parking space name"
                        >
                            <div>
                                <FaCarAlt className="text-xl" />
                            </div>
                            <div>{markerDetails.spaceName}</div>
                        </div>
                        <div
                            className="flex items-center gap-2"
                            title="Parking ower contect number"
                        >
                            <div>
                                <FaPhone />
                            </div>
                            <div>{markerDetails.phoneNo}</div>
                        </div>
                        <div
                            className="flex items-center gap-2"
                            title="Rate per hour"
                        >
                            <div>
                                <FaIndianRupeeSign className="-mr-1" />
                            </div>
                            <div>{markerDetails.ratePerHour} / hour</div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="p-2 h-[60vh]">
                        <Images
                            fileUrls={JSON.parse(
                                markerDetails.fileUrls || "[]"
                            )}
                        />
                    </div>

                    {/* Book Tiket */}
                    <div>
                        <Button
                            className="w-full p-2 font-semibold text-white bg-c3"
                            onClick={bookTicket}
                        >
                            Book This Space
                        </Button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </section>
    );
}
