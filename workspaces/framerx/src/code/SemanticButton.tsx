import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import styled from 'react-emotion'
import { SemanticButton as _SemanticButton } from "../lib";

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
})

// Define type of property
interface Props {
  title: string
  onClick: () => void
  type:
    | "default"
    | "primary"
    | "secondary"
    | "basic"
  color: string
}

export class SemanticButton extends React.Component<Props> {

  // Set default properties
  static defaultProps = {
    title: "Click Me!",
    onClick: () => {},
    type: 'default',
    color: 'default'
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: "Title" },
    type: {
      type: ControlType.Enum,
      options: ['default', 'primary', 'secondary', 'basic'],
      title: 'Button Type'
    },
    color: {
      type: ControlType.Enum,
      options: ['default', 'red', 'orange', 'yellow', 'olive', 'green', 'teal',
                'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black' ],
      title: 'Button Color',
      hidden(props) {
        return props.type === 'primary' || props.type === 'secondary'
      }
    }
  };

  render() {
    const { title, color, type } = this.props 
    return (
      <Wrapper>
        <_SemanticButton
          onClick={() => this.props.onClick()}
          {...{[type]: true, color}}
          title={title} />
      </Wrapper>
    )
  }
}
