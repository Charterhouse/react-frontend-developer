import React from 'react'
import { render } from 'react-testing-library'
import { PageCentered } from './'

describe('PageCentered', () => {
  it('has proper styling', () => {
    const { container } = render(<PageCentered />)
    expect(container).toMatchSnapshot()
  })
})
