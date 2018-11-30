import React from 'react'
import { render } from 'react-testing-library'
import { ValueWrapper } from './'

describe('ValueWrapper', () => {
  it('has proper styling', () => {
    const { container } = render(<ValueWrapper />)
    expect(container).toMatchSnapshot()
  })
})
