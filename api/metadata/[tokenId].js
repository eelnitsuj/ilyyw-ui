import axios from 'axios'
import { get } from 'lodash'

export default async function handler (request, response) {
  const metadata = {
    name: `I Hate You, You're Scary #${request.query.tokenId}`,
    description: 'SCARY',
    image: 'https://nftmade.mypinata.cloud/ipfs/QmY1TY4Ye2S56Mr8v7PgVfofbQAa7BWcVpcPeXGymKu4pg/ihyys_5.gif',
    attributes: [
      {
        trait_type: 'I Hate You',
        trait_value: "You're Scary",
      },
    ],
  }

  response
    .setHeader('Cache-Control', 'public, max-age=172800')
    .status(200)
    .json(metadata)
}
