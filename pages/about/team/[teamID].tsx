import { useRouter } from "next/router";
import { Fragment } from "react";
import { Team } from "../../../types/api/Team";
import config from "../../../config.json";

interface Props {
  team: Team;
}

function TeamID({ team }: Props) {
  return (
    <div className="center thin">
      <br />
      <a href="/about">&larr; About</a>
      <h1>{team.name}</h1>
      <a
        href={`mailto:${team.emailAlias}@ystv.co.uk`}
      >{`${team.emailAlias}@ystv.co.uk`}</a>
      <p>{team.longDescription}</p>
      <br />
      <h2>Team Members:</h2>
      {team.members.map((e, i) => {
        return (
          <Fragment key={`committeesub${i}`}>
            <h3>
              {e.officerName} - {e.userName}
            </h3>
            <span>
              <a
                href={`mailto:${e.emailAlias}@ystv.co.uk`}
              >{`${e.emailAlias}@ystv.co.uk`}</a>
            </span>
            {/* {e.avatar !== "" ? (
              <img
                src={`https://ystv.co.uk/static/images/members/thumb/${e.avatar}`}
                alt={`${e.userName}'s Profile`}
              />
            ) : (
              <Fragment />
            )} */}
          </Fragment>
        );
      })}
    </div>
  );
}

export default TeamID;

export async function getServerSideProps(context) {
  try {
    let res = await fetch(
      `${config.api.rest}/v1/public/teams/${context.query.teamID}`
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
