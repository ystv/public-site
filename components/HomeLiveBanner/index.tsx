enum HomeLiveBannerStatus {
  null,
  live,
  scheduled,
  cancelled,
  finished,
  featured,
}

interface HomeLiveBannerProps {
  status: HomeLiveBannerStatus;
}

export default function HomeLiveBanner({ status }: HomeLiveBannerProps) {
  return <div>{JSON.stringify(HomeLiveBannerStatus[status])}</div>;
}
