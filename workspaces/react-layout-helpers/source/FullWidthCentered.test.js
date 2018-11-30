import React from 'react'
import { render } from 'react-testing-library'
import { FullWidthCentered } from './'

describe('FullWidth', () => {
  it('has proper styling', () => {
    const { container } = render(<FullWidthCentered />)
    expect(container).toMatchSnapshot()
  })
})
