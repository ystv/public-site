import YstvHead from "../components/YstvHead";
import Image from "next/image";
import MapImage from "../public/site-images/ystv_map.png";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/src/css/mapbox-gl.css";
import MapPin from "../public/site-images/Map-Pin-YSTV-Web.svg";

function YSTVMap() {
  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <Image
        src={MapImage}
        alt="Map showing YSTV's location on Campus West"
        unoptimized
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    );
  }
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -1.05553,
        latitude: 53.94636,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={-1.05553} latitude={53.94636} anchor="bottom">
          <Image src={MapPin} alt="A map pin, with the YSTV Logo in the centre." width={64} height={64} />
        </Marker>
      </Map>
  )
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
