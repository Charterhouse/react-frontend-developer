import { Data, Override } from "framer"

const connectorState = Data({ open: false })

export const cogitoConnector: Override = () => {
  return {
    onTrigger() {
      connectorState.open = true
    },
    onClosed() {
      connectorState.open = false
    },
    open: connectorState.open
  }
}
