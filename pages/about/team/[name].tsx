// import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment } from "react";
import {Team, TeamMember} from "../../../types/api/Team";

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
      {team.members?.map((member, i) => {
        return (
          <Fragment key={`member${i}`}>
            <h3>
              {member.officerName} - {member.userName}
            </h3>
            <span>
              <a
                href={`mailto:${member.emailAlias}@ystv.co.uk`}
              >{`${member.emailAlias}@ystv.co.uk`}</a>
                {getHistoryWikiURL(member)}
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}

function getHistoryWikiURL(member: TeamMember) {
    return (
        <div>See the history of this role on the <a href={member.historywikiURL}>Wiki</a><br /></div>
    )
}

export async function getServerSideProps(context) {
  try {
    let res = await fetch(
      `${process.env.REST_API}/v1/public/teams/email/${context.query.name}`
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
    return { props: { team: null } };
  }
}
