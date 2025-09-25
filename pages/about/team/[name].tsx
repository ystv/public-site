import Link from "next/link";
import { Team, TeamMember } from "../../../types/api/Team";
import styles from "./name.module.css";

interface Props {
  team: Team;
}

export default function TeamID({ team }: Props) {
  return (
    <div className="center thin">
      <br />
      <Link href="/about">&larr; About</Link>
      <h1 className="capitalise">{team.name}</h1>
      <a
        href={`mailto:${team.emailAlias}@ystv.co.uk`}
      >{`${team.emailAlias}@ystv.co.uk`}</a>
      <p>{team.longDescription}</p>
      <br />
      <h2>Team Members:</h2>
      <div className={styles.membersGrid}>
        {team.members?.map((member: TeamMember, i) => (
          <div key={`member${i}`} className={styles.memberCard}>
            <div className={styles.memberFlex}>
              <img
                src={member.avatar}
                alt={`${member.userName}'s avatar`}
                className={styles.memberAvatar}
                onError={
                  (e) => (e.currentTarget.src = "/default-avatar.png") // optional fallback
                }
              />
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>
                  {member.userName}
                  {member.pronouns != undefined ? (
                    <i>({member.pronouns})</i>
                  ) : (
                    <div></div>
                  )}
                </h3>
                <h3 className={styles.memberTitle}>{member.officerName}</h3>
                <div className={styles.memberDetails}>
                  <a
                    href={`mailto:${member.emailAlias}@ystv.co.uk`}
                    className={styles.email}
                  >
                    {member.emailAlias}@ystv.co.uk
                  </a>
                  <div>
                    See the history of this role on the{" "}
                    <a
                      href={member.historywikiURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Wiki
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    let res = await fetch(
      `${process.env.REST_API}/v1/public/teams/email/${context.query.name}`,
    ).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    return { props: { team: res } };
  } catch {
    let defaultTeam: Team = {
      id: -1,
      name: "Unavailable",
      emailAlias: "unavailable",
      shortDescription: "Unavailable",
      longDescription: "Unavailable",
      members: [],
    };
    return { props: { team: defaultTeam } };
  }
}
