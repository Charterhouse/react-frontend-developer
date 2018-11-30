import React from 'react'
import { render } from 'react-testing-library'
import { Row } from './'

describe('Row', () => {
  it('has proper styling', () => {
    const { container } = render(<Row />)
    expect(container).toMatchSnapshot()
  })
})
