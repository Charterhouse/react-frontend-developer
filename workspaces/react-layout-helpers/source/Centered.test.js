import React from 'react'
import { render } from 'react-testing-library'
import { Centered } from './'

describe('Centered', () => {
  it('has proper styling', () => {
    const { container } = render(<Centered />)
    expect(container).toMatchSnapshot()
  })
})
