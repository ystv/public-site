import { env } from "process";

export default function Version({ ver, build }) {
  return (
    <>
      <h1>Commit Version:</h1>
      <h3>{ver}</h3>
      <h1>Build Version:</h1>
      <h3>{build}</h3>
    </>
  );
}

export function getServerSideProps() {
  return { props: { ver: process.env.SOURCE_ID, build: process.env.BUILD_ID } };
}
