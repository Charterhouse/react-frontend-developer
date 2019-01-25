import React from 'react'

const WithStoreContext = React.createContext({
  store: {}
})

class WithStoreInner extends React.Component {
  constructor ({ store, selector = state => state }) {
    super()
    const state = store.getState()
    const dprops = selector(state)
    this.state = {
      ...dprops
    }
  }

  componentDidMount () {
    this.unsubscribe = this.props.store.subscribe(() => {
      if (this.unmounted) return
      const state = this.props.store.getState()
      const props = this.props.selector(state)
      this.setState({
        ...props
      })
    })
    this.unmounted = false
  }

  componentWillUnmount () {
    this.unmounted = true
    this.unsubscribe()
  }

  render () {
    const { store, render, children } = this.props

    return render
      ? render(this.state, store.dispatch)
      : children(this.state, store.dispatch)
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
