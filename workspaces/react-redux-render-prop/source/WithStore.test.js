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
  let renderFunction

  const render = ({ renderFunction, selector, useRenderProp = false }) => {
    return renderRtl(
      <WithStore.Provider value={{ store }}>
        {
          useRenderProp
            ? <WithStore selector={selector} render={renderFunction} />
            : <WithStore selector={selector}>{renderFunction}</WithStore>
        }
      </WithStore.Provider>
    )
  }

  const selector = state => ({ name: state.name })
  const setNameAction = name => ({ type: 'SET_NAME', name })

  beforeEach(() => {
    store = createStore(testReducer)
    functionArgs = {}
    renderFunction = (obj, dispatch) => {
      Object.assign(functionArgs, obj, { dispatch })
      return null
    }
  })

  it('always provides dispatch to the render function', () => {
    render({ renderFunction, selector })

    expect(functionArgs.dispatch).toBeDefined()
  })

  it('provides selected state attribute', () => {
    render({ renderFunction, selector })

    functionArgs.dispatch(setNameAction(name))

    expect(functionArgs.name).toBe(name)
  })

  it('provides the real, working dispatch to the render function', () => {
    render({ renderFunction, selector })

    functionArgs.dispatch(setNameAction(name))

    expect(functionArgs.name).toBe(name)
  })

  it('calls the render prop instead of using children when provided', () => {
    render({ renderFunction, selector, useRenderProp: true })

    functionArgs.dispatch(setNameAction(name))

    expect(functionArgs.name).toBe(name)
  })

  it('calls render function imediately after it is mounted', () => {
    const name = 'initial name'
    store = createStore(testReducer, { name })

    render({ renderFunction, selector })
    expect(functionArgs.name).toBe(name)
  })

  it('calls render function on state change', () => {
    render({ renderFunction, selector })
    expect(functionArgs.name).not.toBeDefined()

    functionArgs.dispatch(setNameAction(name))
    expect(functionArgs.name).toBe(name)
  })
})
