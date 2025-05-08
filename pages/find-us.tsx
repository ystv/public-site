"use client";
import YstvHead from "../components/YstvHead";
import Image from "next/image";
import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import MapPin from "../public/site-images/Map-Pin-YSTV-Web.svg";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

function YSTVMap() {
  const [viewState, setViewState] = useState({
    longitude: -1.05553,
    latitude: 53.94636,
    zoom: 16,
  });

  return (
    <Map
      {...viewState}
      style={{ width: "100%", height: 400 }}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      initialViewState={{
        longitude: -1.05553,
        latitude: 53.94636,
      }}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      <Marker longitude={-1.05553} latitude={53.94636}>
        <Image
          src={MapPin}
          alt="Map pin with YSTV logo"
          width={64}
          height={64}
        />
      </Marker>
    </Map>
  );
}

export default function FindUs() {
  return (
    <div className="center thin">
      <YstvHead />
      <h1>Find Us</h1>
      <YSTVMap />
      <p>
        YSTV’s studio is in James College; if you need any help finding us just
        ask at Campus South Information or email us. There’s a courtyard in the
        centre of James College (where the fountain is), and on one side you
        will see a window with the YSTV sign. As you’re looking at the window,
        there’s a door to the right of it. Go through this door, and you’ll find
        YSTV on your left after the second set of doors.
      </p>
    </div>
  );
}
