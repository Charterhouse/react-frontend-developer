import { render } from '@testing-library/react'
import { DistributedHorizontally } from './'

describe('DistributedHorizontally', () => {
  it('has proper styling', () => {
    const { container } = render(<DistributedHorizontally />)
    expect(container).toMatchSnapshot()
  })
})
