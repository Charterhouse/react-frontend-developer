module.exports = {
  siteMetadata: {
    title: 'React Frontend Developer',
    editBaseUrl: 'https://github.com/Charterhouse/react-frontend-developer/blob/master'
  },
  plugins: [
    {
      resolve: '@confluenza/gatsby-theme-confluenza',
      options: {}
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-root-import'
  ]
}
