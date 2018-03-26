import 'prismjs/themes/prism-coy.css'
import graphql from 'graphql'
import glamorous from 'glamorous'
import { rhythm } from '../utils/typography'

import { LayoutGrid, SidebarGridItem, ContentGridItem } from './LayoutGrid'
import { Navigation } from './Navigation'

export const FixedNavigation = glamorous.div({
  display: 'block',
  position: 'fixed',
  top: rhythm(1),
  height: `calc(100vh - ${rhythm(2)})`,
  overflowY: 'auto',
  backgroundColor: '#70a8a9',
  borderRight: '1px solid #70a8a9',
  WebkitOverflowScrolling: `touch`,
  '::-webkit-scrollbar': {
    width: `6px`,
    height: `6px`
  },
  '::-webkit-scrollbar-thumb': {
    background: '#568e8f'
  }
})

const Layout = ({ children, data: { navigation: { docs } } }) => (
  <LayoutGrid>
    <SidebarGridItem>
      <FixedNavigation>
        <Navigation docs={docs} />
      </FixedNavigation>
    </SidebarGridItem>
    <ContentGridItem>
      { children() }
    </ContentGridItem>
  </LayoutGrid>
)

export const pageQuery = graphql`
  query Navigation {
    navigation: allMarkdownRemark(
      filter: { frontmatter: { path: { ne: "/404.html" } } }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      docs: edges {
        node {
          frontmatter {
            title
            path
          }
          headings(depth: h2) {
            value
          }
        }
      }
    }
  }
`

export default Layout
