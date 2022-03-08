import addresses from './_addresses'
import { uniq } from 'lodash'

test('addresses', () => {
  it('has all unique addresses', () => {
    const unique = uniq(addresses.map((a) => a.toLowerCase()))

    expect(unique.length).toEqual(addresses.length)
  })
})
