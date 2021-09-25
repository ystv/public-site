const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  trailingSlash: true,
});

module.exports = {
  async redirects() {
    return [
      {
        source: "/login/internal/",
        destination: "https://old.ystv.co.uk/login/internal",
        permanent: false,
      },
    ];
  },
};
