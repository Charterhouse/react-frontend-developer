import React from 'react'
import { render } from '@testing-library/react'
import { ValueWrapper } from './'

describe('ValueWrapper', () => {
  it('has proper styling', () => {
    const { container } = render(<ValueWrapper />)
    expect(container).toMatchSnapshot()
  })
})
