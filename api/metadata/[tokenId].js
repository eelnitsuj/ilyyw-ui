import axios from 'axios'
import { get } from 'lodash'

export default async function handler (request, response) {
  const metadata = get(
    await axios.get(
      'https://gateway.ipfs.io/ipfs/QmZZsnZDt5vcrcwGyzDd6wzLMBb357pPtZbxC6KvvFEbwY/hidden.json'
    ),
    'data'
  )

  // TODO: Maybe enumerate the hidden tokens?
  // const result = {
  //   ...metadata,
  //   name: `${metadata.name} #${request.query.tokenId}`,
  // }

  response.status(200).json(metadata)
}
