import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Contract, utils } from 'ethers'
import styled from '@emotion/styled'
import axios from 'axios'
import { get, isEmpty } from 'lodash'
import { motion } from 'framer-motion'
import { css } from '@emotion/react'

import { useInterval } from '../util/hooks'
import { APP_NETWORK, PAUSE } from '../util/blockchain'
import HeartContainer from './HeartContainer'
import Button from './Button'
import { colors } from '../util/styles'

const MintSection = styled(motion.section)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 769px) {
    margin-top: 80px;
    flex-direction: column;
    align-items: center;
  }
`

const QuantityToggle = styled.div`
  margin-top: 10px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
`

const MintAmount = styled.span`
  font-size: 25px;
  margin: 0 15px;
  color: white;
`

const MintButtonContainer = styled.div`
  margin: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media all and (max-width: 768px) {
    margin: 0 30px;
  }
`

const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: #bf8bf9;
  padding: 10px;
  font-weight: bold;
  font-size: 0.8rem;
  color: white;
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);

  :disabled {
    background-color: #b6b6b6;
    cursor: not-allowed;
  }
`

const StyledRoundButtonContent = styled.span`
  pointer-events: none;
`

const H2 = styled.h2`
  text-align: center;
  color: white;
`

const H3 = styled.h3`
  color: white;
  margin: 0;
  font-size: 2.5rem;
`

const H4 = styled.h4`
  margin: 5px;
  opacity: 0.5;
  font-size: 1.3rem;
  color: white;
`

const ConnectYourWallet = styled.div`
  margin: 60px 5px;
  text-align: center;
  color: white;
`

const ContractAddress = styled.div`
  margin-top: 10px;
  font-size: 0.7em;
`

const Messages = styled.div`
  margin-top: 11px;
  font-size: 0.8em;
  text-align: center;
  color: #fff;
  max-width: 500px;

  a {
    color: ${colors.weirdPurple};
  }
`

async function getMerkleProof (address) {
  try {
    const result = await axios.get('/api/merkle-proof', {
      params: {
        address,
      },
    })

    return result.data.merkleProof
  } catch (e) {
    console.error(e)
  }
}

function Mint ({ blockchainState, connectWallet, walletConnecting }) {
  const [mintAmount, setMintAmount] = useState(1)
  const [merkleProof, setMerkleProof] = useState()
  const [maxTokenSupply, setMaxTokenSupply] = useState(10000)
  const [totalSupply, setTotalSupply] = useState(0)
  const [minting, setMinting] = useState(false)
  const [message, setMessage] = useState()
  const [checkingWeirdList, setCheckingWeirdList] = useState(false)

  useEffect(async () => {
    const { accounts, contract } = blockchainState

    if (accounts) {
      try {
        setCheckingWeirdList(true)

        const proof = await getMerkleProof(accounts[0])

        setMerkleProof(proof)
      } catch (e) {
        setMessage('Error checking Weird List status.')
      } finally {
        setCheckingWeirdList(false)
      }
    }

    if (contract) {
      const totalSupply = await contract.totalSupply()
      setTotalSupply(totalSupply)
    }
  }, [blockchainState])

  useInterval(async () => {
    const { contract } = blockchainState

    if (contract) {
      const totalSupply = await contract.totalSupply()
      setTotalSupply(totalSupply)
    }
  }, 12000)

  const decrementMintAmount = () => {
    if (mintAmount > 1) setMintAmount((prevState) => prevState - 1)
  }

  const incrementMintAmount = () => {
    if (mintAmount < 2) setMintAmount((prevState) => prevState + 1)
  }

  const mint = async () => {
    if (mintAmount > 2) {
      return setMessage('Max mint amount is 2 for raffle mint!')
    }

    const { contract, price } = blockchainState
    const value = price.mul(mintAmount)

    try {
      setMinting(true)

      const tx = await contract.merkleMint(merkleProof, mintAmount, {
        value,
      })

      await tx.wait()

      setMessage(
        <>
          Successfully minted 🙂 see transaction:{' '}
          <a href={`https://etherscan.io/tx/${tx.hash}`}>
            https://etherscan.io/tx/{tx.hash}
          </a>
          .
          <br />
          You can view your new tokens on OpenSea or LooksRare!
        </>
      )
    } catch (e) {
      const errorMessage = get(
        e,
        'error.message',
        'Error occurred while minting.'
      )
      setMessage(errorMessage)
      console.error('Error occurred while minting:', e)
    } finally {
      setMinting(false)
    }
  }

  const walletConnected = blockchainState.price && blockchainState.contract
  // const correctChain = blockchainState.chainId === APP_NETWORK.id
  const correctChain = true
  const priceFormatted = blockchainState.price
    ? utils.formatEther(blockchainState.price)
    : ''

  const priceMultiplied = blockchainState.price
    ? utils.formatEther(blockchainState.price.mul(mintAmount))
    : ''

  const contractAddress = get(blockchainState, 'contract.address')
  const contractHref = `https://etherscan.io/address/${contractAddress}`

  const weirdListStatus = isEmpty(merkleProof)
    ? 'You are not on the raffle list 🙁'
    : 'You can mint!'

  return (
    <MintSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {false && !correctChain && (
        <ConnectYourWallet>
          Please switch your network to {APP_NETWORK.name} and refresh your
          browser to mint.
        </ConnectYourWallet>
      )}

      {false && correctChain && !walletConnected && (
        <ConnectYourWallet>
          {walletConnecting
            ? (
                'Connecting...'
              )
            : (
            <>
              <h1>Raffle Mint Live!</h1>
              <Button
                onClick={connectWallet}
                css={css`
                  min-width: 220px;
                `}
              >
                Connect Wallet
              </Button>
            </>
              )}
        </ConnectYourWallet>
      )}
          <HeartContainer>
            <H3>10000</H3>
            <H4>/{maxTokenSupply} minted</H4>
          </HeartContainer>

          <MintButtonContainer>
            <H2>
              Sold out!
            </H2>
            <Messages>
              Head to <a href="https://opensea.io/collection/ilyyw">OpenSea</a> to see the collection.
            </Messages>
            {/* <QuantityToggle>
              <StyledRoundButton
                onClick={decrementMintAmount}
                disabled={isEmpty(merkleProof) || mintAmount <= 1}
              >
                <StyledRoundButtonContent>-</StyledRoundButtonContent>
              </StyledRoundButton>
              <MintAmount>{mintAmount}</MintAmount>
              <StyledRoundButton
                onClick={incrementMintAmount}
                disabled={isEmpty(merkleProof) || mintAmount >= 2}
              >
                <StyledRoundButtonContent>+</StyledRoundButtonContent>
              </StyledRoundButton>
            </QuantityToggle>
            <Button
              onClick={mint}
              disabled={isEmpty(merkleProof) || minting}
              css={css`
                width: 180px;
              `}
            >
              {minting ? 'Minting...' : `Mint (${priceMultiplied}E)`}
            </Button>

            {process.env.NODE_ENV === 'development' && (
              <ContractAddress>
                <a href={contractHref}>Contract</a>
              </ContractAddress>
            )} */}
          </MintButtonContainer>

          <HeartContainer>
            <H3>10000</H3>
            <H4>/{maxTokenSupply} minted</H4>
          </HeartContainer>
    </MintSection>
  )
}

Mint.propTypes = {
  blockchainState: PropTypes.object,
  connectWallet: PropTypes.func,
  walletConnecting: PropTypes.bool,
}

export default Mint
