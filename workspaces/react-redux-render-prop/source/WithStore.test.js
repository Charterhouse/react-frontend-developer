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
    case 'SET_OBJECT':
      return {
        object: action.object
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
  const objectSelector = state => ({
    object: state.object
  })
  const setNameAction = name => ({ type: 'SET_NAME', name })
  const setObjectAction = object => ({ type: 'SET_OBJECT', object })

  beforeEach(() => {
    store = createStore(testReducer)
    functionArgs = {}
    renderFunction = jest.fn((obj, dispatch) => {
      if (typeof obj === 'function' && dispatch === undefined) {
        Object.assign(functionArgs, { dispatch })
      } else {
        Object.assign(functionArgs, obj, { dispatch })
      }
      return null
    })
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

  it('does not re-render when the observed props did not change (deepEqual)', () => {
    render({ renderFunction, selector: objectSelector })
    expect(functionArgs.object).not.toBeDefined()

    const object = { a: 1, b: { c: 2, d: '3' } }

    functionArgs.dispatch(setObjectAction(object))
    expect(functionArgs.object).toMatchObject(object)

    functionArgs.dispatch(setObjectAction({ ...object }))
    expect(renderFunction).toHaveBeenCalledTimes(2)
  })

  it('only provides the dispatch function when selector is not provided', () => {
    render({ renderFunction, selector: undefined })
    expect(functionArgs.dispatch).toBe(store.dispatch)
    expect(Object.keys(functionArgs)).toEqual(['dispatch'])

    functionArgs.dispatch(setNameAction(name))
    expect(Object.keys(functionArgs)).toEqual(['dispatch'])
  })
})
