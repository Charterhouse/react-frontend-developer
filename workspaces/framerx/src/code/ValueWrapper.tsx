import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import styled from '@emotion/styled'

import { ValueWrapper as _ValueWrapper } from "../lib";

const Wrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
})

// Define type of property
interface Props {
    value: string;
}

export class ValueWrapper extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        value: "Hello World!"
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        value: { type: ControlType.String, title: "Value" },
    }

    render() {
        return (
            <Wrapper>
                <_ValueWrapper>{this.props.value}</_ValueWrapper>
            </Wrapper>
        );
    }
}
