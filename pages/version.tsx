import YstvHead from "../components/YstvHead";

export default function Version({ ver, build }) {
  return (
    <>
      <YstvHead />
      <div className="center thin">
        <h1>Commit Version:</h1>
        <h3>{ver}</h3>
        <h1>Build Version:</h1>
        <h3>{build}</h3>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      ver: process.env.SOURCE_ID ?? "n/a",
      build: process.env.BUILD_ID ?? "n/a",
    },
  };
}
