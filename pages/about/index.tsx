import YstvHead from "../../components/YstvHead";
import { Teams } from "../../types/api/Team";
import Link from "next/link";

function About({ teams }: Teams) {
  return (
    <div className="center thin">
      <YstvHead />
      <main>
        <h1>About</h1>
        <h2>We Are York Student Television!</h2>
        <div>
          <br />
          <p>
            <strong>Have you ever wanted to be on TV?</strong>
          </p>

          <p>
            Well here’s your chance!&nbsp; York Student Television is a student
            TV station run by students, for students.&nbsp; That means that
            students write, produce, present and direct all the
            programmes.&nbsp; YSTV broadcasts both live and pre-recorded shows
            online with our on demand service.
          </p>
          <br />
          <p>
            YSTV has been broadcasting since 1967, which makes it England’s
            longest running student television station (and second longest in
            the UK).&nbsp; It’s won countless awards for everything from its
            live music shows to documentaries.
          </p>
          <br />
          <p>
            Each week YSTV produces live and pre-recorded shows, including
            cookery, news, chat and quiz shows, featuring interviews with bands,
            politicians and celebrities. The major events YSTV broadcasts each
            year are the whole of Battle of the Bands, the York SU elections and
            Roses. Viewers can watch the events from the comfort of their own
            room.
          </p>
          <br />
          <p>
            YSTV is very lucky to have its own control room and studio (complete
            with green screen!), something most student TV stations don’t have
            the space for.&nbsp; You don’t need to have any experience to join
            YSTV, as we can teach you to do anything, just lots of enthusiasm!
          </p>
          <br />
          <p>
            So if you’ve ever wanted to get your face on screen, try out your
            skills behind a camera, or have a brilliant idea for a show then
            email{" "}
            <a href="mailto:welcome@ystv.co.uk">welcome@ystv.co.uk</a>{" "}
            or <Link href="/get-involved">find out more about getting involved</Link>!
          </p>
        </div>
        <br /> <h2>Our Teams:</h2>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {teams.map((team, i) => {
            return (
              <div key={`committeemid${i}`}>
                <h3 style={{ textTransform: "capitalize" }}>
                  <Link href={`/about/team/${team.emailAlias}`}>
                    {team.name}
                  </Link>
                </h3>
                <p className="noa">{team.shortDescription}</p>
                <br />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default About;

export async function getServerSideProps(context) {
  try {
    let res = await fetch(`${process.env.REST_API}/v1/public/teams`).then(
      (res) => {
        if (!res.ok) {
          context.res.statusCode = 302;
          context.res.setHeader("Location", `/404`);
        } else {
          return res.json();
        }
      }
    );
    return { props: { teams: res } };
  } catch {
    return { props: { teams: null } };
  }
}
