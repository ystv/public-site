import YstvHead from "../../components/YstvHead";
import { Team, Teams } from "../../types/api/Team";
import Link from "next/link";

import {
  mdiAccountCog,
  mdiMonitor,
  mdiTools,
  mdiBullhorn,
  mdiVideoOutline,
  mdiFileQuestionOutline,
} from "@mdi/js";
import styles from "./index.module.css";
import { Icon } from "@mdi/react";

const teamIcons = {
  admin: mdiAccountCog,
  computing: mdiMonitor,
  technical: mdiTools,
  marketing: mdiBullhorn,
  production: mdiVideoOutline,
  unavailable: mdiFileQuestionOutline,
};

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
            email <a href="mailto:welcome@ystv.co.uk">welcome@ystv.co.uk</a> or{" "}
            <Link href="/get-involved">
              find out more about getting involved
            </Link>
            !
          </p>
        </div>
        <br /> <h2>Our Teams:</h2>
        <div className={styles.teamsGrid}>
          {teams.map((team, i) => (
            <Link
              key={`team-${i}`}
              href={`/about/team/${team.emailAlias}`}
              className={styles.teamCardLink}
            >
              <div className={styles.teamCard}>
                <div className={styles.teamIcon}>
                  <Icon path={teamIcons[team.emailAlias]} size={1.5} />
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{team.name}</h3>
                  <p className={styles.teamDescription}>
                    {team.shortDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
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
      },
    );
    return { props: { teams: res } };
  } catch {
    let defaultTeams: Team[] = [
      {
        id: -1,
        name: "Unavailable",
        emailAlias: "unavailable",
        shortDescription: "Unavailable",
        longDescription: "Unavailable",
        members: [],
      },
    ];
    return { props: { teams: defaultTeams } };
  }
}
