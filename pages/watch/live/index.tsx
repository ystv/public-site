import YstvHead from "../../../components/YstvHead";
import { channel } from "./[liveURLName]";
import LiveVideoCell from "../../../components/LiveVideoCell";

export default function LiveBrowse({ channels }: { channels: channel[] }) {
  return (
    <div className="center thin">
      <YstvHead title="Live Channels" />
      <h1>Live Channels</h1>
      <div style={{ display: "flex" }}>
        {channels.length == 0 ? (
          <h3>
            Sorry, looks like there&apos;s nothing live right now, check back
            later!
          </h3>
        ) : (
          channels.map((e, i) => <LiveVideoCell video={e} key={i} />)
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const channels: channel[] = await fetch(
    `${process.env.REST_API}/v1/public/playout/channel`
  ).then((res) => res.json());

  return { props: { channels } };
}
