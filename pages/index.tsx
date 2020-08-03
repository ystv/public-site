import YstvHead from "../Components/YstvHead";

export default function Home() {
  return (
    <>
      <YstvHead />
      <main>
        <div className="grid">
          <h3>Join Us &rarr;</h3>
          <p>Some about text linking to a proper freshers page.</p>
          <h3>Featured &rarr;</h3>
          <p>Some videos</p>
          <h3>Recent &rarr;</h3>
          <p>More videos</p>
          <h3>Popular &rarr;</h3>
          <p>Other videos</p>
          <a href="/watch">
            <h3>Watch More</h3>
          </a>
        </div>
      </main>
    </>
  );
}
