import React from 'react'
import { render } from 'react-testing-library'
import { FullWidth } from './'

describe('FullWidth', () => {
  it('has proper styling', () => {
    const { container } = render(<FullWidth />)
    expect(container).toMatchSnapshot()
  })
})
