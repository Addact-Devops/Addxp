/** @type {import('next').NextConfig} */
// const redirects = require("./src/redirectUrls.json");
const redirects = require("./redirects");
const webpack = require("webpack");
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
            })
        );

        return config;
    },
    async headers() {
        return [
            {
                source: "/(.*)", // Add your specific route or use a wildcard to apply to all routes
                headers: [
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff ",
                    },
                    {
                        key: "Expect-CT",
                        value: "max-age=86400, enforce",
                    },

                    {
                        key: "Content-Security-Policy",
                        value:
                            "default-src 'self' *; " +
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' *; " +
                            "script-src-attr 'unsafe-inline' 'unsafe-eval' *; " +
                            "style-src 'self' 'unsafe-inline' *; " +
                            "img-src 'self' *; " +
                            "connect-src 'self' *; " +
                            "font-src 'self' *; " +
                            "object-src 'none'; " +
                            "media-src 'self' *; " +
                            "frame-src 'self' *; " +
                            "child-src 'self' *; " +
                            "form-action 'self' *;",
                    },
                    {
                        key: "X-YOURSITE-CSRF-PROTECTION",
                        value: "1",
                    },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "self",
                    },
                    {
                        key: "Access-Control-Allow-Credentials",
                        value: "true",
                    },
                    {
                        key: "X-Permitted-Cross-Domain-Policies",
                        value: "none",
                    },

                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                ],
            },
        ];
    },

    async redirects() {
        return redirects;
    },
};

module.exports = nextConfig;
