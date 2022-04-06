import { render } from '@testing-library/react'
import { Centered } from './'

describe('Centered', () => {
  it('has proper styling', () => {
    const { container } = render(<Centered />)
    expect(container).toMatchSnapshot()
  })
})
