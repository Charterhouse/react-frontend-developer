import Typography from 'typography'
import moragaTheme from 'typography-theme-moraga'

moragaTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  'a': {
    textDecoration: 'none'
  },
  'a:hover': {
    textDecoration: 'none'
  }
})

const typography = new Typography(moragaTheme)

const { rhythm, scale } = typography
export { rhythm, scale, typography as default }
