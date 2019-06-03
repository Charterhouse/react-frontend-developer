import React from 'react'
import { render } from '@testing-library/react'
import { FullWidthCentered } from './'

describe('FullWidth', () => {
  it('has proper styling', () => {
    const { container } = render(<FullWidthCentered />)
    expect(container).toMatchSnapshot()
  })
})
