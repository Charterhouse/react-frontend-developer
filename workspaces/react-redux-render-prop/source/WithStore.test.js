import React from 'react'
import { render as renderRtl } from 'react-testing-library'
import { WithStore } from './'
import { createStore } from 'redux'

const testReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        name: action.name
      }
    default:
      return state
  }
}

describe('WithStore', () => {
  const name = 'some name'
  let functionArgs
  let store
  let renderPropFunction

  const render = (ui, selector) => {
    return renderRtl(
      <WithStore.Provider value={{ store }}>
        <WithStore selector={selector}>{ui}</WithStore>
      </WithStore.Provider>
    )
  }

  const nameSelector = state => ({ name: state.name })
  const setNameAction = name => ({ type: 'SET_NAME', name })

  beforeEach(() => {
    store = createStore(testReducer)
    functionArgs = {}
    renderPropFunction = (obj, dispatch) => {
      Object.assign(functionArgs, obj, { dispatch })
      return null
    }
  })

  it('provides selected state attribute', () => {
    render(renderPropFunction, nameSelector)

    store.dispatch(setNameAction(name))

    expect(functionArgs.name).toBe(name)
  })

  it('always provides dispatch to the rendered function', () => {
    render(renderPropFunction, nameSelector)

    expect(functionArgs.dispatch).toBeDefined()
    expect(functionArgs.name).not.toBeDefined()
    functionArgs.dispatch(setNameAction(name))

    expect(functionArgs.name).toBe(name)
  })
})
