import React from 'react'
import deepEqual from 'deep-equal'

const WithStoreContext = React.createContext({
  store: {}
})

class WithStoreInner extends React.Component {
  constructor (props) {
    super(props)
    const { store, selector } = props
    if (selector) {
      const state = store.getState()
      const dprops = selector(state)
      this.state = {
        ...dprops
      }
    }
  }

  componentDidMount () {
    if (this.props.selector) {
      this.unsubscribe = this.props.store.subscribe(() => {
        if (this.unmounted) return
        const state = this.props.store.getState()
        const props = this.props.selector(state)
        if (!deepEqual(props, this.state, { strict: true })) {
          this.setState({
            ...props
          })
        }
      })
      this.unmounted = false
    }
  }

  componentWillUnmount () {
    this.unmounted = true
    this.unsubscribe && this.unsubscribe()
  }

  render () {
    const { store, render, children } = this.props

    if (render) {
      return this.state
        ? render(this.state, store.dispatch)
        : render(store.dispatch)
    } else {
      return this.state
        ? children(this.state, store.dispatch)
        : children(store.dispatch)
    }
  }
}

class WithStore extends React.Component {
  static Provider = ({ value, children }) => (
    <WithStoreContext.Provider value={value}>
      {children}
    </WithStoreContext.Provider>
  )
   static WithStoreInner = WithStoreInner;

   render () {
     return (
       <WithStoreContext.Consumer>
         {({ store }) => (
           <WithStoreInner store={store} {...this.props}>
             {this.props.children}
           </WithStoreInner>
         )}
       </WithStoreContext.Consumer>
     )
   }
}

export { WithStore }
