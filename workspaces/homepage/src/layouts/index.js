import { React } from 'react'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import { DocumentationLayout } from './documentation'

const Wrapper = styled.div({
  padding: '25px'
})

const Layout = ({ location, children }) => (
  <div>
    <Global styles={{
      'html,body': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }
    }} />
    {(location.pathname === '' || location.pathname === '/')
      ? <Wrapper>{ children }</Wrapper>
      : <DocumentationLayout location={location}>{children}</DocumentationLayout>}
  </div>
)

export default Layout
