import Head from "next/head";
import { useRouter } from "next/router";

type props = {
  title?: string | null;
};

function YstvHead({ title }: props) {
  const router = useRouter();
  let pageTitle = "York Student Television"; // Standard Title displayed on homepage

  // if path isn't home do concatenation
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
      {/* Facebook/Open Graph */}
      <meta property="og:site_name" content="YSTV" />
      <meta property="og:image" content="/ystv_primary_logo_small.jpg" />
      <meta property="og:image:alt" content="YSTV" />
      <meta property="og:type" content="website" />
      {/* Twitter Card */}
      <meta name="twitter:title" content="YSTV" />
      <meta name="twitter:site" content="@ystv" />
      <meta name="twitter:domain" content="ystv.co.uk" />
      <meta name="twitter:image" content="/ystv_primary_logo_small.jpg" />
      {/* Favicon generator code*/}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png?v=6935kqvmJB"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png?v=6935kqvmJB"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png?v=6935kqvmJB"
      />
      <link rel="manifest" href="/favicons/site.webmanifest?v=6935kqvmJB" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg?v=6935kqvmJB"
        color="#333333"
      />
      <link rel="shortcut icon" href="/favicons/favicon.ico?v=6935kqvmJB" />
      <meta name="msapplication-TileColor" content="#fbfbfb" />
      <meta
        name="msapplication-config"
        content="/favicons/browserconfig.xml?v=6935kqvmJB"
      />
      <meta name="theme-color" content="#fbfbfb" />
    </Head>
  );
}

export default YstvHead;
