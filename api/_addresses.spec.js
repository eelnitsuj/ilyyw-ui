import { rawAddresses, cleanedAddresses } from './_addresses'

describe('addresses', () => {
  it('has all unique addresses', () => {
    console.log(`before: ${rawAddresses.length}, after: ${cleanedAddresses.length}`)
    expect(cleanedAddresses.length).toEqual(rawAddresses.length)
  })
})
