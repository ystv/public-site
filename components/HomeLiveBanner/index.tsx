import useSWR from "swr";
import { channel } from "../../pages/watch/live/[liveURLName]";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  MotionStyle,
  Transition,
} from "framer-motion";
import React, { ReactNode } from "react";
import styles from "./index.module.css";
import dynamic from "next/dynamic";
import { channelStatus } from "../../types/api/Channel";

export default function HomeLiveBanner() {
  const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());
  const { data } = useSWR<Array<channel>>(
    `${process.env.NEXT_PUBLIC_REST_API}/v1/public/playout/channel`,
    fetcher,
    { refreshInterval: 60000 }
  );

  const variants = {
    initial: { height: 0 },
    show: { height: "auto" },
  };

  const SectionWrapper = ({
    key,
    children,
    style,
    transition,
  }: {
    key: string;
    children: ReactNode;
    style?: MotionStyle;
    transition?: Transition;
  }) => (
    <m.div
      style={{ overflow: "hidden", ...style }}
      initial={"initial"}
      variants={variants}
      animate={"show"}
      exit={"initial"}
      transition={transition ?? { duration: 0.8 }}
      key={key}
    >
      {children}
    </m.div>
  );

  const LiveModal = dynamic(() => import("../LiveFeaturedPlayerBanner"));

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence exitBeforeEnter initial={false}>
        {data &&
          data.length > 0 &&
          (() => {
            const primaryChannel = data[0];
            const primaryChannelStatus =
              channelStatus[primaryChannel.status.toUpperCase()];

            if (primaryChannelStatus == channelStatus.LIVE)
              return (
                <SectionWrapper
                  style={{ padding: "0 1rem" }}
                  key={"player"}
                  transition={{ duration: 2 }}
                >
                  <LiveModal channel={primaryChannel} />
                </SectionWrapper>
              );
            if (primaryChannelStatus == channelStatus.SCHEDULED)
              return (
                <SectionWrapper key={"scheduled"}>
                  <div className={styles.flexRow}>
                    <div className={styles.livePulse} />
                    <small>
                      YSTV will be going live soon, tune it at{" "}
                      {new Date(
                        primaryChannel.scheduledStart
                      ).toLocaleTimeString("en-US", {
                        timeStyle: "short",
                      })}
                    </small>
                  </div>
                </SectionWrapper>
              );
            if (primaryChannelStatus == channelStatus.CANCELLED)
              return (
                <SectionWrapper key={"cancelled"}>
                  <div className={styles.flexRow}>
                    <div className={styles.livePulse2} />
                    <small>
                      Apologies, unfortunately we&apos;ve had to cancel the
                      stream
                    </small>
                  </div>
                </SectionWrapper>
              );
            if (primaryChannelStatus == channelStatus.FINISHED)
              return (
                <SectionWrapper key={"finished"}>
                  <div className={styles.flexRow}>
                    <div className={styles.livePulse3} />
                    <small>
                      The stream has just finished, check back soon to watch
                      on-demand
                    </small>
                  </div>
                </SectionWrapper>
              );
          })()}
      </AnimatePresence>
    </LazyMotion>
  );
}
