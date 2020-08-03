interface Props {
  series: {
    id;
    url;
    name;
    description;
    thumbnail;
  };
}

export default function SeriesCell({ series }: Props) {
  let e = series;

  return (
    <div>
      <img
        src={`https://ystv.co.uk/static/images/shows/${e.thumbnail}`}
        height="100"
      ></img>
      <a href={"/watch/series/" + e.id}>
        <h2>{e.name}</h2>
      </a>
      <h5>{e.description}</h5>
    </div>
  );
}
