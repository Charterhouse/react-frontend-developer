import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'

export const SemanticButton = ({ title, ...other }) => (
  <Button {...other}>{title}</Button>
)
