import { rawAddresses, cleanedAddresses } from './_addresses'

describe('addresses', () => {
  it('has all unique addresses', () => {
    expect(cleanedAddresses.length).toEqual(rawAddresses.length)
  })
})
