import { Data, Override } from "framer"

const connectorState = Data({ open: false })

export const cogitoConnector: Override = () => {
  return {
    onOpen: () => {
      connectorState.open = true
    },
    onDone: () => {
      connectorState.open = false
    },
    onCancel: () => {
      connectorState.open = false
    },
    open: connectorState.open
  }
}
