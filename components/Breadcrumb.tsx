import { Fragment } from "react";

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
        <Fragment key={`breadcrumbmaster${i}`}>
          {i != a.length - 1 ? (
            <Fragment key={`breadcrumbsub${i}`}>
              <a
                href={`/watch/series/${e.id}`}
                key={`breadcrumb${i}`}
                style={{ fontWeight: "bolder", textDecoration: "underline" }}
              >
                {e.name}
              </a>{" "}
              {" / "}
            </Fragment>
          ) : (
            <a key={`breadcrumb${i}`}>{e.name}</a>
          )}
        </Fragment>
      ))}
    </h4>
  );
}
