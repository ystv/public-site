import YstvHead from "../components/YstvHead";
import Link from "next/link";

export default function GetInvolved() {
  return (
    <div className="center thin">
      <main>
        <>
          <YstvHead />
          <h1>Get Involved</h1>
          <div>
            <p>
              Have you had a lifelong dream to work in television?&nbsp; Maybe
              you fancied yourself a Blue Peter presenter, or a news reader, or
              maybe you always wanted to direct a live music show.&nbsp; If this
              sounds familiar, YSTV is the society for you.
            </p>
            <p>
              You can have a go at anything and everything at YSTV.&nbsp; From
              producing to presenting, from writing to editing, from directing
              to advertising – whatever it is, we can teach you.
            </p>
            <p>&nbsp;</p>
            <p>
              To get involved in YSTV email us at{" "}
              <strong>
                <a href="mailto:welcome@ystv.co.uk">
                  welcome@ystv.co.uk
                </a>
              </strong>
              , or drop in to our studio anytime.&nbsp; You can find out where
              we are by clicking <Link href="/find-us">here</Link>.
            </p>
            <p>
              We send out a regular{" "}
              <a href="http://go.ystv.co.uk/signup2023">
                newsletter
              </a>{" "}
              with updates on upcoming productions, so make sure you sign up (you’ll need to sign in with your University account).
            </p>
            <p>
              On a day-to-day basis we talk to each other and plan productions using Slack (if you’ve used Discord it’s very similar).
              You can <a href="http://go.ystv.co.uk/slack">join our Slack workspace</a> to talk to us.
            </p>
          </div>

          <p>&nbsp;</p>
          <p>
            Interested in learning more and getting involved? Email&nbsp;
            <strong>
              <a href="mailto:welcome@ystv.co.uk">welcome@ystv.co.uk</a>
            </strong>
            . <span>No experience is necessary!</span>
            &nbsp;We look forward to hearing from you!
          </p>
        </>
      </main>
    </div>
  );
}
