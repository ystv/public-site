import YstvHead from "../components/YstvHead";

export default function Hires() {
  return (
    <div>
      <YstvHead />
      <main>
        <div className="grid center thin">
          <h1>We'd love to work with you, this is how to hire us &rarr;</h1>
          <p>YSTV has the following equipment available for hire.</p>
          <p>
            Ratified YSTV productions can see all equipment available free of
            charge here.
          </p>
          <p>
            Costs are per item per day, but this page should be used as a guide
            only and charges/equipment may change at any time.
          </p>
          <p>
            Please contact{" "}
            <a href="mailto:hires@ystv.co.uk">hires@ystv.co.uk</a> with details
            of what you need and what you plan to do at least 24 hours before
            you need it, and an exact quote will be provided.
          </p>
          <p>
            All hires are subject to availability of equipment, with priority
            going to YSTV productions.
          </p>
        </div>
      </main>
    </div>
  );
}
