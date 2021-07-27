import YstvHead from "../components/YstvHead";

export default function FiveHundred() {
  return (
    <>
      <YstvHead />
      <main>
        <div
          style={{
            color: "#000",
            background: "#fff",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Roboto, Segoe UI&quot, Fira Sans, Avenir, Helvetica Neue, Lucida Grande, sans-serif",
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h1
              style={{
                display: "inline-block",
                margin: 0,
                marginRight: "20px",
                padding: "10px 23px 10px 0",
                fontSize: "4rem",
                fontWeight: 500,
                verticalAlign: "top",
              }}
            >
              500 - Internal Error
            </h1>
          </div>
          <h1>Oops, looks like somebody left the lens cap on!</h1>
        </div>
      </main>
    </>
  );
}
