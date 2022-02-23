import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

import addresses from './_addresses'

export default function handler(_, response) {
  const merkleTree = new MerkleTree(addresses, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  })

  const merkleRoot = merkleTree.getHexRoot()

  response.status(200).json({
    data: merkleRoot,
  });
}
