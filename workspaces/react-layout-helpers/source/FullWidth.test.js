import { render } from '@testing-library/react'
import { FullWidth } from './'

describe('FullWidth', () => {
  it('has proper styling', () => {
    const { container } = render(<FullWidth />)
    expect(container).toMatchSnapshot()
  })
})
