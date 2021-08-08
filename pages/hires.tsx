import YstvHead from "../components/YstvHead";

export default function Hires() {
  return (
    <div>
      <YstvHead />
      <main>
        <div className="grid center thin">
          <h1>Hires</h1>
          <h2>We&apos;d love to work with you, here&apos;s how to hire us!</h2>
          <p>
            We&apos;re still pulling our updated kit list together for this year
            so unfortunately a list isn&apos;t viewable online at this time, but
            please reach out with your requests and our Production Team will be
            glad to help you out.
          </p>
          <br />
          <p>
            Whether you want a video produced about your society, or a
            livestream of your event, or even to borrow our kit to shoot on
            yourself - we have experience catering to all sizes of production.
          </p>
          <br />
          <p>
            Please contact{" "}
            <a href="mailto:hires@ystv.co.uk">hires@ystv.co.uk</a> with details
            of what you need and what you plan to do at least 24 hours before
            you need it, and we can provide you with a quote.
          </p>
          <br />
          <p>
            All hires are subject to availability of equipment, with priority
            going to YSTV productions.
          </p>
        </div>
      </main>
    </div>
  );
}
