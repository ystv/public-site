import YstvHead from "../components/YstvHead";

export default function Results(props) {
  return (
    <main>
      <YstvHead />
      <div className="center thin">
        <h1>These are results for &quot;{props.search}&quot; &rarr;</h1>
        {props.res.map((e, i) => (
          <h2 key={i}>{e}</h2>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  let res = ["ManMan", "Hunted 2", "Schubert^2"];
  let search = context.query.search;
  return { props: { res, search } };
}
