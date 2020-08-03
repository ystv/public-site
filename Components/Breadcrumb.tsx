interface Props {
  breadcrumb: {
    name: string;
    id: number;
    url: string;
    useInURL: boolean;
  }[];
}

export default function Breadcrumb({ breadcrumb }: Props) {
  return (
    <h4>
      {breadcrumb.map((e, i, a) => (
        <>
          {i != a.length - 1 ? (
            <>
              <a href={`/watch/series/${e.id}`} key={"breadcrumb" + i}>
                {e.name}
              </a>{" "}
              {" / "}
            </>
          ) : (
            <a key={"breadcrumb" + i}>{e.name}</a>
          )}
        </>
      ))}
    </h4>
  );
}
