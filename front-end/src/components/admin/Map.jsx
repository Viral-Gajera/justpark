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
    const markerGroup = useRef(L.featureGroup());

    useEffect(() => {
        if (mapRef.current) {
            map.current = L.map(mapRef.current).setView(
                [props.latitude, props.longitude],
                15
            );

            const tileLayer = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {}
            );

            tileLayer.addTo(map.current);

            markerGroup.current.addTo(map.current);

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

            return () => {
                map.current.remove();
            };
        }
    }, [props]);

    return <div className="w-full h-full" ref={mapRef}></div>;
}
