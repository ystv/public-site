import YstvHead from "../../components/YstvHead";
import VideoCarousel from "../../components/VideoCarousel/VideoCarousel";
import GradientDiv from "../../components/GradientDiv";

export default function Watch({
  recentVideoPageState,
  randomVideoPageState,
  popularVideoPageState,
}) {
  return (
    <>
      <YstvHead />
      <div className="thin center">
        <h1>Watch</h1>
      </div>
      <div className="mediumThin center">
        <VideoCarousel
          title="Most Popular (Ever)"
          videos={popularVideoPageState.all}
          detail
          disableSeeMore
        />
      </div>
      <div className="thin center">
        <a
          href={"/watch/live"}
          style={{
            textDecorationColor: "var(--light)",
            WebkitTextDecorationColor: "var(--light)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "6rem",
              // borderRadius: "1rem",
              // overflow: "hidden",
            }}
          >
            <GradientDiv>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <h2
                  style={{
                    color: "var(--light)",
                  }}
                >
                  Watch YSTV Live!
                </h2>
              </div>
            </GradientDiv>
          </div>
        </a>
      </div>
      <div className="mediumThin center">
        <VideoCarousel
          title="Recent"
          videos={recentVideoPageState}
          detail
          disableSeeMore
        />

        <VideoCarousel
          title="Featured"
          videos={recentVideoPageState}
          detail
          disableSeeMore
        />

        {/*<VideoCarousel*/}
        {/*  title="Most Popular (Month)"*/}
        {/*  videos={popularVideoPageState.month}*/}
        {/*  detail*/}
        {/*  disableSeeMore*/}
        {/*/>*/}

        <VideoCarousel
          title="Most Popular (Year)"
          videos={popularVideoPageState.year}
          detail
          disableSeeMore
        />

        {/*<VideoCarousel*/}
        {/*  title="Entertainment"*/}
        {/*  videos={recentVideoPageState}*/}
        {/*  detail*/}
        {/*  disableSeeMore*/}
        {/*/>*/}

        {/*<VideoCarousel*/}
        {/*  title="Factual"*/}
        {/*  videos={recentVideoPageState}*/}
        {/*  detail*/}
        {/*  disableSeeMore*/}
        {/*/>*/}

        {/*<VideoCarousel*/}
        {/*  title="Scripted"*/}
        {/*  videos={recentVideoPageState}*/}
        {/*  detail*/}
        {/*  disableSeeMore*/}
        {/*/>*/}

        {/*<VideoCarousel*/}
        {/*  title="Sport"*/}
        {/*  videos={recentVideoPageState}*/}
        {/*  detail*/}
        {/*  disableSeeMore*/}
        {/*/>*/}

        {/*<VideoCarousel*/}
        {/*  title="Archives"*/}
        {/*  videos={recentVideoPageState}*/}
        {/*  detail*/}
        {/*  disableSeeMore*/}
        {/*/>*/}

        <VideoCarousel
          title="Looking for something random?"
          videos={randomVideoPageState}
          detail
          disableSeeMore
        />

        <h2 style={{ textAlign: "center" }}>
          More ways to discover our content coming soon...
        </h2>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let recentVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/videos/50/0`
  ).then((res) => res.json());

  let randomVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/playlist/random`
  )
    .then((res) => res.json())
    .then((res) => res.videos);

  let popularVideoPageState = {
    all: null,
    year: null,
    month: null,
  };

  popularVideoPageState.all = await fetch(
    `${process.env.REST_API}/v1/public/playlist/popular/all`
  )
    .then((res) => res.json())
    .then((res) => res.videos);

  popularVideoPageState.year = await fetch(
    `${process.env.REST_API}/v1/public/playlist/popular/year`
  )
    .then((res) => res.json())
    .then((res) => res.videos);

  popularVideoPageState.month = await fetch(
    `${process.env.REST_API}/v1/public/playlist/popular/month`
  )
    .then((res) => res.json())
    .then((res) => res.videos);

  let featuredVideoPageState = null;
  return {
    props: {
      recentVideoPageState,
      randomVideoPageState,
      popularVideoPageState,
      featuredVideoPageState,
    },
  };
}
