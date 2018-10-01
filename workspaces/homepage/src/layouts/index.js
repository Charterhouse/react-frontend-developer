import { React } from 'react'
import glamorous from 'glamorous'
import { DocumentationLayout } from './documentation'

const Wrapper = glamorous.div({
  padding: '25px'
})

const Layout = ({ location, children }) => {
  if (location.pathname === '' || location.pathname === '/') {
    return (
      <Wrapper>{children}</Wrapper>
    )
  } else {
    return (
      <DocumentationLayout location={location}>{children}</DocumentationLayout>
    )
  }
}

export default Layout
