import YstvHead from "../components/YstvHead";
import { Fragment } from "react";
import config from "../config.json";

function About({ people }) {
  return (
    <>
      <YstvHead />
      <h1>About</h1>
      <h2>We Are York Student TV!</h2>
      <br />
      <main>
        <div className="grid">
          <h2>Our Committee</h2>
          {people !== null &&
            people.map((e, i) => {
              return (
                <Fragment key={`committeemid${i}`}>
                  <h3>{e.name}</h3>
                  {e.members.map((e, i) => {
                    return (
                      <Fragment key={`committeesub${i}`}>
                        <h4>{e.position}</h4>
                        <h5>{e.name}</h5>
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

export default About;

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
