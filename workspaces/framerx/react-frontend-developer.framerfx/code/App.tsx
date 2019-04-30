import { Data, Override } from "framer"

const appData = Data({ value: 'Initial value' })

export const onClick: Override = () => {
  return {
    onClick: () => {
      appData.value = 'Semantic Button is alive!'
      console.log('Semantic Button is alive!')
    }
  }
}

export const useValue: Override = props => {
  return {
    ...props,
    value: appData.value
  }
}
