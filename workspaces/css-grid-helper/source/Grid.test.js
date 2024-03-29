import { Grid } from './Grid'

describe('Grid', () => {
  it('takes grid specification as an argument', () => {
    const grid = new Grid([
      'cell11 cell12',
      'cell21 cell22'
    ])
    expect(grid).not.toBeNull()
  })

  it('the returned object has container property', () => {
    const grid = new Grid([
      'cell11 cell12',
      'cell21 cell22'
    ])

    expect(grid.container).toBeDefined()
  })

  it('returns an object with properties corresponding to the names of cells', () => {
    const grid = new Grid([
      'cell11 cell12',
      'cell21 cell22'
    ])

    expect(grid.cell11).toBeDefined()
    expect(grid.cell12).toBeDefined()
    expect(grid.cell21).toBeDefined()
    expect(grid.cell22).toBeDefined()
  })

  it('the returned container object has display property set to grid', () => {
    const grid = new Grid([
      'cell11 cell12',
      'cell21 cell22'
    ])

    expect(grid.container.display).toBe('grid')
  })
})
