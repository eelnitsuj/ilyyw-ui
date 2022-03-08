import axios from 'axios'
import { get } from 'lodash'

export default async function handler (request, response) {
  const metadata = get(
    await axios.get(
      'https://gateway.ipfs.io/ipfs/QmUGJbt6SVy9Fd4uZ2ga3bhUCbUZfbk4kvnttYx13LX4Wi/hidden.json'
    ),
    'data'
  )

  response
    .setHeader('Cache-Control', 'public, max-age=172800')
    .status(200)
    .json(metadata)
}
