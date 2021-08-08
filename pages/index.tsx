import YstvHead from "../components/YstvHead";
import VideoCarousel from "../components/VideoCarousel/VideoCarousel";

import styles from "./index.module.css";
import GenreBox from "../components/GenreBox";
import Image from "next/image";
import Link from "next/link";
import carouselBG from "../public/site-images/carousel.jpg";
import Button from "../components/Button/Button";
import { useState } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

export default function Home({
  recentVideoPageState,
  popularVideoPageState,
  featuredVideoPageState,
  genreVideoPageState,
}) {
  enum BannerState {
    Text,
    ShowReel,
    About,
  }

  const itemTransition = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const wrapperTransitions = {
    goodbye: { opacity: 0, transition: { duration: 0.2 } },
    visible: {
      opacity: 1,
    },
  };

  const [bannerState, setBannerState] = useState(BannerState.Text);

  return (
    <>
      <YstvHead />
      <main>
        <div className={styles.bannerImage}>
          <Image
            src={carouselBG}
            layout="fill"
            priority
            objectFit="cover"
            placeholder="blur"
            alt=""
          />
          <div
            className={`${styles.bannerFilter} ${
              bannerState !== BannerState.Text ? styles.blur : ""
            }`}
          >
            <div className={styles.bannerContents}>
              <LazyMotion features={domAnimation} strict>
                <AnimatePresence exitBeforeEnter>
                  {bannerState == BannerState.Text && (
                    <m.div
                      variants={wrapperTransitions}
                      transition={{
                        duration: 1,
                        staggerChildren: 0.25,
                        delayChildren: 0.2,
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="goodbye"
                      key="banner"
                    >
                      <m.h1 variants={itemTransition}>
                        <b>We are York Student Television.</b>
                      </m.h1>
                      <m.h3 variants={itemTransition}>
                        University of York Student Group of the Year 2021
                      </m.h3>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        <m.div variants={itemTransition}>
                          <Button
                            label="About Us"
                            onClick={() => setBannerState(BannerState.About)}
                          />
                        </m.div>
                        <m.div variants={itemTransition}>
                          <Button
                            label="Highlights"
                            outline
                            onClick={() => setBannerState(BannerState.ShowReel)}
                          />
                        </m.div>
                      </div>
                    </m.div>
                  )}
                  {bannerState == BannerState.About && (
                    <m.div
                      variants={itemTransition}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      key="about"
                      style={{ minWidth: 300, textAlign: "center" }}
                      className="thin"
                    >
                      <b>
                        <p>
                          York Student Television is a student TV station run by
                          students, for students.&nbsp; That means that students
                          write, produce, present and direct all the
                          programmes.&nbsp; YSTV broadcasts both live and
                          pre-recorded shows online with our on demand service.
                        </p>
                        <p>
                          YSTV has been broadcasting since 1967, which makes it
                          England’s longest running student television station
                          (and second longest in the UK).&nbsp; It’s won
                          countless awards for everything from its live music
                          shows to documentaries.
                        </p>
                        <Link href={"/about"} passHref>
                          <p
                            style={{
                              fontWeight: "bolder",
                              fontSize: "larger",
                              textDecoration: "underline",
                            }}
                          >
                            Read More &rarr;
                          </p>
                        </Link>
                      </b>
                      <Button
                        label="X"
                        onClick={() => setBannerState(BannerState.Text)}
                        outline
                      />
                    </m.div>
                  )}
                  {bannerState == BannerState.ShowReel && (
                    <m.div
                      style={{ textAlign: "center" }}
                      key="reel"
                      variants={itemTransition}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className={styles.iFrameResizer}>
                        <iframe
                          src="https://www.youtube.com/embed/3F076oLy_Lo"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <br />
                      <Button
                        label="X"
                        onClick={() => setBannerState(BannerState.Text)}
                        outline
                      />
                    </m.div>
                  )}
                </AnimatePresence>
              </LazyMotion>
            </div>
          </div>
        </div>
        <div className="mediumThin center">
          <div className={styles.homeThin}>
            <VideoCarousel
              title="Featured"
              videos={featuredVideoPageState}
              disableSeeMore
            />
          </div>
          <div className={styles.homeThin}>
            <VideoCarousel
              title="Recent"
              videos={recentVideoPageState}
              disableSeeMore
            />
          </div>
        </div>
        <GenreBox videos={[genreVideoPageState]} />
        <div className="mediumThin center">
          <div className={styles.homeThin}>
            <VideoCarousel
              title="Popular"
              videos={popularVideoPageState}
              disableSeeMore
            />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let recentVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/0`
  ).then((res) => res.json());

  let popularVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/playlist/popular/all`
  )
    .then((res) => res.json())
    .then((json) => json.videos);

  let genreVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/500`
  ).then((res) => res.json());

  let featuredVideoPageState = await fetch(
    `${process.env.REST_API}/v1/public/videos/12/600`
  ).then((res) => res.json());

  return {
    props: {
      recentVideoPageState,
      popularVideoPageState,
      featuredVideoPageState,
      genreVideoPageState,
    },
  };
}
