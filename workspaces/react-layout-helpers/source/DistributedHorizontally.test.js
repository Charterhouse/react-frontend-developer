import React from 'react'
import { render } from 'react-testing-library'
import { DistributedHorizontally } from './'

describe('DistributedHorizontally', () => {
  it('has proper styling', () => {
    const { container } = render(<DistributedHorizontally />)
    expect(container).toMatchSnapshot()
  })
})
