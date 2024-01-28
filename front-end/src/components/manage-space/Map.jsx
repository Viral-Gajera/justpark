import React from "react";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

import Button from "../form/Button";
import customMarkerIcon from "../../images/location marker.png";

export default function Map(props) {
    const map = useRef(null);
    const mapRef = useRef(null);
    const routingControlRef = useRef(null);
    const markerGroup = useRef(L.featureGroup());

    const [center, setCenter] = useState([
        props.latitude || 40.7128,
        props.longitude || -74.006,
    ]);
    const [input, setInput] = useState();

    useEffect(() => {
        if (mapRef.current) {
            map.current = L.map(mapRef.current).setView(center, 13);

            const tileLayer = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {}
            );

            tileLayer.addTo(map.current);

            markerGroup.current.addTo(map.current);

            if (props.latitude && props.longitude) {
                // Clear existing markers
                markerGroup.current.clearLayers();

                // Add new marker

                const customIcon = L.icon({
                    iconUrl: customMarkerIcon,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                });

                const marker = L.marker([props.latitude, props.longitude], {
                    icon: customIcon,
                });
                markerGroup.current.addLayer(marker);

                props.setLatitude(props.latitude);
                props.setLongitude(props.longitude);
            }

            if (!props.readOnly) {
                map.current.on("click", handleMapClick);
            }

            return () => {
                map.current.remove();
            };
        }
    }, [center]);

    const getUserLocation = () => {
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
    };

    const handleUserEnteredLocation = async () => {
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
                    console.error("Location not found");
                }
            } else {
                console.error("Error fetching location data");
            }
        } catch (error) {
            console.error("Error handling user-entered location:");
        }
    };

    function handleMapClick(event) {
        const clickedLatitude = event.latlng.lat;
        const clickedLongitude = event.latlng.lng;

        // Clear existing markers
        markerGroup.current.clearLayers();

        // Add new marker

        const customIcon = L.icon({
            iconUrl: customMarkerIcon,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
        });

        const marker = L.marker([clickedLatitude, clickedLongitude], {
            icon: customIcon,
        });
        markerGroup.current.addLayer(marker);

        props.setLatitude(clickedLatitude);
        props.setLongitude(clickedLongitude);
    }

    return (
        <div className="w-[70%] h-[85%] flex flex-col items-center justify-center gap-5 p-5 bg-white rounded-lg">
            {/* <h1 className="text-xl font-bold">Location</h1> */}
            <div className="flex flex-col w-full gap-2 lg:gap-3 lg:flex-row">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full input input-bordered"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button
                    className="lg:w-[150px] py-[10px] text-white rounded-lg bg-c3 font-bold"
                    onClick={handleUserEnteredLocation}
                >
                    Search
                </Button>
                <Button
                    className="lg:w-[300px] py-[10px] text-white rounded-lg bg-c3 font-bold"
                    onClick={getUserLocation}
                >
                    Use Current Location
                </Button>
            </div>
            <div className="w-full h-[90%] border rounded" ref={mapRef}></div>

            <a href="#image" className="block w-full">
                <Button className="w-full py-[10px] text-white rounded-lg bg-c3 font-bold">
                    Next
                </Button>
            </a>
        </div>
    );
}
