
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `QR Code`,
    description: `QR Code Implementation`,
    author: `Kerstin Huppenbauer`,
  },
  plugins: [
    {
      resolve: "gatsby-source-graphcms",
      options: {
        endpoint: process.env.HYGRAPH_API_URL,
        token: process.env.HYGRAPH_API_TOKEN,
        locales: ["de"],
        stages: ["PUBLISHED"],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `QR Code`,
        short_name: `QR Code`,
        start_url: `/`,
        background_color: `#111827`,
        theme_color: `#111827`,
        display: `minimal-ui`,
        icon: `static/favicon.ico`,
      },
    },
    `gatsby-plugin-offline`,
    'gatsby-plugin-postcss',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
