import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../util/contract'

function App () {
  const [blockchainState, setBlockchainState] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const connectWallet = async () => {
    setLoading(true)

    if (window.ethereum) {
      try {
        const { ethereum } = window
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        const chainId = await ethereum.request({ method: 'eth_chainId' })
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
        const price = await contract.price()

        setBlockchainState(prevState => ({
          ...prevState,
          accounts,
          chainId,
          contract,
          price,
        }))

        setMessage('Wallet connected.')
      } catch (e) {
        setMessage('There was an error connecting your wallet.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div>Hello World!</div>
      {loading && <div>Loading...</div>}
      {blockchainState.accounts && <div>{blockchainState.accounts[0]}</div>}
      <div>{message}</div>
      <div>{blockchainState.price && `${ethers.utils.formatEther(blockchainState.price)} ETH to mint`}</div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </>
  )
}

export default App
