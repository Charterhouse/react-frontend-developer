import glamorous from 'glamorous'
import { rhythm } from '../utils/typography'
import { Grid } from '@react-frontend-developer/css-grid-helper'

let grid = new Grid([
  'sidebar content'
], {
  gridTemplateColumns: '300px 800px'
})

const LayoutGrid = glamorous.div(grid.container, {
  boxSizing: 'border-box',
  margin: rhythm(1)
})

const SidebarGridItem = glamorous.div(grid.sidebar, { padding: '1rem' })
const ContentGridItem = glamorous.div(grid.content, { width: '100%' })

export { LayoutGrid, SidebarGridItem, ContentGridItem }
