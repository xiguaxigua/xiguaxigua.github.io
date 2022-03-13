// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "xiguaxigua's blog",
  tagline: "record interesting things",
  url: "https://blog.xiguaxigua.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon-32x32.png",
  organizationName: "xiguaxigua",
  projectName: "blog",

  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["en", "zh-Hans"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          path: "./blog",
          routeBasePath: "/",
          showReadingTime: true,
          blogSidebarCount: 0,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "xiguaxigua's blog",
        items: [
          { to: "/tags", label: "标签", position: "left" },
          { to: "/about", label: "关于", position: "left" },
          {
            href: "https://github.com/xiguaxigua",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} <a style="text-decoration: none;border-bottom: none;color: #fff;" target="_blank" rel="noopener" href="https://www.upyun.com/?utm_source=lianmeng&amp;utm_medium=referral"> | 本站由 <img src="https://cdn.xiguaxigua.com/blog/upyun.png" style="display:inline; vertical-align:middle; position: relative; top: -2px;" height="30">提供 cdn 加速/云存储服务</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
