import React from 'react'
import { render } from 'react-testing-library'
import { Spacer } from './'

describe('Spacer', () => {
  it('has proper styling', () => {
    const { container } = render(<Spacer>test</Spacer>)
    expect(container).toMatchSnapshot()
  })

  it('has proper styling when using render prop', () => {
    const { container } = render(<Spacer render={() => 'test'} />)
    expect(container).toMatchSnapshot()
  })
})
