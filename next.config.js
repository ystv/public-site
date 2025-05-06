const withMDX = require("@next/mdx")({
    extension: /\.mdx$/,
});
const MDXExport = withMDX({
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    trailingSlash: true,
});

module.exports = {
    async redirects() {
        return [
            {
                source: "/login/internal",
                destination: "https://old.ystv.co.uk/login/internal",
                permanent: false,
            },
        ];
    },
    output: "standalone",
    ...MDXExport,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.ystv.co.uk',
            },
            {
                protocol: 'https',
                hostname: 'auth.ystv.co.uk',
            }
        ],
    },
}