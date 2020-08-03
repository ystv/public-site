export default function Results(props) {
  return (
    <div>
      <main>
        <div className="grid">
          <h1>These are results for "{props.search}" &rarr;</h1>
          {props.res.map((e) => (
            <h2>{e}</h2>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  let res = ["ManMan", "Hunted 2", "Schubert^2"];
  let search = context.query.search;
  return { props: { res, search } };
}
