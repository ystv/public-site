import Head from "next/head";
import { useRouter } from "next/router";

type props = {
  title?: string | null;
};

function YstvHead({ title }: props) {
  const router = useRouter();
  var pageTitle = "York Student Television"; // Standard Title displayed on homepage

  // if path isn't home do concatonation
  if (router.pathname !== "/") {
    //if title isn't preset, get title from first part of url pathname
    if (title == null) {
      title = router.pathname;
      title = title
        .split("/")[1]
        .replace("-", " ")
        .replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    } else {
    }
    // add suffix onto end of main page title
    pageTitle = pageTitle.concat(" | ", title);
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="icon" href="http://ystv.co.uk/static/images/favicon.ico" />
    </Head>
  );
}

export default YstvHead;
