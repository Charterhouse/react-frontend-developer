import * as React from "react";
import styled from '@emotion/styled'
import { PropertyControls, ControlType } from "framer";
import { CogitoConnector as _CogitoConnector } from "@cogitojs/cogito-react-ui";

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
})

interface Props {
  open: boolean
  onOpen: () => void
  onDone: () => void
  onCancel: () => void
  connectUrl: string
  buttonType:
    | "default"
    | "primary"
    | "secondary"
    | "basic"
  buttonColor: string
}

export class CogitoConnector extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    open: false,
    onTrigger: () => {},
    onClosed: () => {},
    connectUrl: 'https://cogito.mobi',
    buttonType: 'primary',
    buttonColor: 'default'
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    connectUrl: { type: ControlType.String, title: 'Connect Url' },
    buttonType: {
      type: ControlType.Enum,
      options: ['default', 'primary', 'secondary', 'basic'],
      title: 'Button Type'
    },
    buttonColor: {
      type: ControlType.Enum,
      options: ['default', 'red', 'orange', 'yellow', 'olive', 'green', 'teal',
                'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black' ],
      title: 'Button Color',
      hidden(props) {
        return props.buttonType === 'primary' || props.buttonType === 'secondary'
      }
    }
  }

  render() {
    const { open, onOpen, onDone, onCancel, connectUrl, buttonType: type, buttonColor: color } = this.props
    return (
      <Wrapper>
        <_CogitoConnector
          open={open}
          onOpen={() => onOpen()}
          onDone={() => onDone()}
          onCancel={() => onCancel()}
          connectUrl={connectUrl}
          buttonStyling={{[type]: true, color}} />
      </Wrapper>
    );
  }
}
