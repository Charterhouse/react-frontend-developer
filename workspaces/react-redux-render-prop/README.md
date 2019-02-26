# react-redux-render-prop

This is a render-props version of [react-redux](https://github.com/reactjs/react-redux/).

> To give credits to react-redux, take into account that react-redux is way more sophisticated. `react-redux-render-prop` does not guarantee the proper order of updates as is the case for `react-redux`. For smaller projects and where your global state is not too deep, `react-redux-render-prop` can still
be considered as an alternative. To learn more about what this solution is missing comparing to
`react-redux` please consult [Implement React Redux from Scratch](https://medium.com/netscape/implementation-of-react-redux-part-1-411b971a9b5b).

> In the advent of react *hooks* and *suspense* and with official public *context* API, you may consider to stop using redux at all.

## Installing

```bash
yarn add @react-frontend-developer/react-redux-render-prop
```

## Usage

First on the top level of the project do:

```javascript
import { WithStore } from '@react-frontend-developer/react-redux-render-prop'
import { store } from 'your-redux-store'
import { ConnectedComponent } from './ConnectedComponent'

const App = () => (
  <WithStore.Provider value={{store}}>
    <ConnectedComponent />
  </WithStore.Provider>
)
```

Then in `ConnectedComponent` (or any other component down the tree that needs to access Redux state) you do:

```jsx
import React from 'react'
import { WithStore } from '@react-frontend-developer/react-redux-render-prop'
import { MyActions } from './actions'

class ConnectedComponent extends React.Component {
  onClick = dispatch => {
    dispatch(MyActions.actionCreator())
  }
  render () {
    return (
      <WithStore
        selector={state => ({
          prop1: state.prop1,
          prop2: state.prop2
        })} >
        { ({ prop1, prop2 }, dispatch) =>
          <div>
            <p>prop1 is {prop1}</p>
            <p>prop2 is {prop2}</p>
            <button onClick={() => this.onClick(dispatch)}>Dispatch</button>
          </div>
        }
      </WithStore>
    )
  }
}

export { ConnectedComponent }
```

If you like you can also use a render prop:

```jsx
<WithStore
  selector={state => ({
    prop1: state.prop1,
    prop2: state.prop2
  })} 
  render={({ prop1, prop2 }, dispatch) =>
    <div>
      <p>prop1 is {prop1}</p>
      <p>prop2 is {prop2}</p>
      <button onClick={() => this.onClick(dispatch)}>Dispatch</button>
    </div>
  }
/>
```

You can use `WithStore` without providing a selector. This is useful when your component wants to
be able to dispatch actions but is not per-se interested in observing the state:

```jsx
<WithStore
  render={dispatch =>
    <div>
      <p>I do not care about the state!</p>
      <button onClick={() => this.onClick(dispatch)}>Dispatch</button>
    </div>
  }
/>
```

or

```jsx
<WithStore>
  { dispatch =>
      <div>
        <p>I do not care about the state!</p>
        <button onClick={() => this.onClick(dispatch)}>Dispatch</button>
      </div>
  }
</WithStore>
```

For testing, we also provide a simple, ready to use mock that you can use as a manual mock.
First on the top-level of your app (or where your `NODE_PATH` points to) create a folder `@react-frontend-developer` and inside it file `react-redux-render-prop.js`. Inside that file put:

```javascript
import { WithStoreMock } from '@react-frontend-developer/react-redux-render-prop'

const WithStore = WithStoreMock

export { WithStore }
```

Then in your tests, you just do:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { ConnectedComponent } from './ConnectedComponent'
import { WithStore } from '@react-frontend-developer/react-redux-render-prop'

const state = {
  prop1: 'test value for prop1',
  prop2: 'test value for prop1'
}

WithStore.mockStore(state)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ConnectedComponent />, div)
})

it('renders correctly', () => {
  const component = renderer
    .create(<ConnectedComponent />)
  expect(component.toJSON()).toMatchSnapshot()
})
```
