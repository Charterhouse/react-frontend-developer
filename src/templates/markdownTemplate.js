import React from 'react'
import Helmet from 'react-helmet'
import { EditFile } from '../components/Editing'
import glamorous from 'glamorous'
import graphql from 'graphql'

const Template = ({ data: { doc } }) => {
  const { html, fileAbsolutePath, frontmatter: { title } } = doc
  return (
    <div>
      <Helmet title={title} />
      <Header>
        <h1>{title}</h1>
        <EditFile fileAbsolutePath={fileAbsolutePath} />
      </Header>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

const Header = glamorous.div({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between'
})

export const pageQuery = graphql`
  query MarkdownByPath($path: String!) {
    doc: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      fileAbsolutePath
      frontmatter {
        title
      }
    }
  }
`

export default Template
