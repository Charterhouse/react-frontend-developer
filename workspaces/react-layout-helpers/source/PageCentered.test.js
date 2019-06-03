import React from 'react'
import { render } from '@testing-library/react'
import { PageCentered } from './'

describe('PageCentered', () => {
  it('has proper styling', () => {
    const { container } = render(<PageCentered />)
    expect(container).toMatchSnapshot()
  })
})
