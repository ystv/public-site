import YstvHead from "../components/YstvHead";

export default function FindUs() {
  return (
    <div className="center thin">
      <YstvHead />
      <h1>Find Us</h1>
      <img
        src="/site-images/ystv_map.png"
        alt="Map showing YSTV's location on Campus West"
        style={{ width: "100%" }}
      />
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
