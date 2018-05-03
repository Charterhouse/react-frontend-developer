# react-redux-render-prop

This is a render-props version of [react-redux](https://github.com/reactjs/react-redux/).

> This is preliminary documentation and will be improved over time. We will also add example app at a later stage.

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

it('renders without crashing', async () => {
  const div = document.createElement('div')
  await ReactDOM.render(<ConnectedComponent />, div)
})

it('renders correctly', () => {
  const component = renderer
    .create(<ConnectedComponent />)
  expect(component.toJSON()).toMatchSnapshot()
})
```
