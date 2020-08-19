import YstvHead from "../components/YstvHead";
import config from "../config.json";
import { Fragment } from "react";

export default function Committee({ people }) {
  return (
    <>
      <YstvHead />
      <main>
        <div className="grid">
          <h1>This is all of us &rarr;</h1>
          {people !== null &&
            people.map((e, i) => {
              return (
                <Fragment key={`committeemid${i}`}>
                  <h2>{e.name}</h2>
                  {e.members.map((e, i) => {
                    return (
                      <Fragment key={`committeesub${i}`}>
                        <h3>{e.position}</h3>
                        <h4>{e.name}</h4>
                        <a href={e.email}>{e.email}</a>
                      </Fragment>
                    );
                  })}
                  <br />
                </Fragment>
              );
            })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let res = await fetch(`${config.api.rest}/v1/public/teams`).then((res) => {
      if (!res.ok) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", `/404`);
      } else {
        return res.json();
      }
    });
    return { props: { people: res } };
  } catch {
    return { props: { people: null } };
  }
}
