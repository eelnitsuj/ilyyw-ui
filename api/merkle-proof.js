import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { get } from 'lodash'

import addresses from './_addresses'

export default function handler (request, response) {
  const merkleTree = new MerkleTree(addresses, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  })

  const leaf = keccak256(get(request, 'query.address'))

  const proof = merkleTree.getHexProof(leaf)

  response.status(200).json({
    data: proof,
  })
}
