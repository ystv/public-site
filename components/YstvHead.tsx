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
      {/* Page metadata */}
      <meta name="title" content="York Student Television" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="York Student Television is an award-winning TV station run entirely by students, for students at the University of York. YSTV produces live and pre-recorded shows, including music, news, chat and quiz shows, featuring interviews with bands, politicians and celebrities, as well as coverage of big campus events."
      />
      <link rel="image_src" href="/static/images/logos/YSTV_meta.jpg" />
      {/* Facebook/Open Graph */}
      <meta property="og:site_name" content="YSTV" />
      <meta
        property="og:image"
        content="https://ystv.co.uk/static/images/logos/YSTV_meta.jpg"
      />
      <meta property="og:image:alt" content="YSTV Logo" />
      <meta property="og:type" content="website" />
      {/* Twitter Card */}
      <meta name="twitter:title" content="York Student Television" />
      <meta name="twitter:site" content="@ystv" />
      <meta name="twitter:domain" content="ystv.co.uk" />
      <meta
        name="twitter:image"
        content="https://ystv.co.uk/static/images/logos/YSTV_meta.jpg"
      />
    </Head>
  );
}

export default YstvHead;
