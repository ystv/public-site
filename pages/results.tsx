import YstvHead from "../components/YstvHead";
import VideoCell from "../components/VideoCell/VideoCell";

export default function Results(props) {
  return (
    <main>
      <YstvHead />
      <div className="center thin">
        <h1>Search results for &quot;{props.search}&quot;</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {props.res.videos ? (
            props.res.videos.map((e, i) => <VideoCell video={e} key={i} />)
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  let search = context.query.search;
  let res = await fetch(`${process.env.REST_API}/v1/public/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: search }),
  }).then((res) => res.json());
  return { props: { res, search } };
}
