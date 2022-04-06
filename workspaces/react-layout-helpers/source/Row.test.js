import { render } from '@testing-library/react'
import { Row } from './'

describe('Row', () => {
  it('has proper styling', () => {
    const { container } = render(<Row />)
    expect(container).toMatchSnapshot()
  })
})
