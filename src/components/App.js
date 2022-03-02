import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import { BLOCKCHAIN } from '../util/constants'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../util/contract'

const Background = styled.div`
  position: absolute;
  background-image: url("https://d2kq0urxkarztv.cloudfront.net/6009044a3570ec00785217d4/3338036/upload-f7009677-fb6c-495b-99d0-da54c85d6a2d.png?e=webp&nll=true");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div``

function App () {
  const [blockchainState, setBlockchainState] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mintAmount, setMintAmount] = useState(1)

  const connectWallet = async () => {
    setLoading(true)

    if (window.ethereum) {
      try {
        const { ethereum } = window
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        const chainId = await ethereum.request({ method: 'eth_chainId' })

        if (chainId !== BLOCKCHAIN.RINKEBY.id) {
          return setMessage(`Please connect to ${BLOCKCHAIN.RINKEBY.name}.`)
        }

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
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
  }

  const mint = async () => {
    const { contract, price } = blockchainState
    const gasLimit = 210000
    const value = price * mintAmount

    try {
      setLoading(true)

      // TODO: Need to set which mint here - public vs merkle
      await contract.mint(mintAmount, { value, gasLimit })
    } catch (e) {
      setMessage('Error occurred while minting.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) setMintAmount(prevState => prevState - 1)
  }

  const incrementMintAmount = () => {
    if (mintAmount < 10) setMintAmount(prevState => prevState + 1)
  }

  const walletConnected = blockchainState.price && blockchainState.contract

  return (
    <Background>
      <Container>
        <div>Hello World!</div>
        {loading && <div>Loading...</div>}
        {blockchainState.accounts && <div>{blockchainState.accounts[0]}</div>}
        <div>{message}</div>
        <div>{blockchainState.price && `${ethers.utils.formatEther(blockchainState.price)} ETH to mint`}</div>
        <button onClick={connectWallet}>Connect Wallet</button>
        {walletConnected &&
          <div>
            <h2>Wallet Connected</h2>
            <div>
              <button onClick={decrementMintAmount}>-</button> {mintAmount} <button onClick={incrementMintAmount}>+</button>
            </div>
            <button onClick={mint}>Mint!</button>
          </div>
        }
      </Container>
    </Background>
  )
}

export default App
