import { ethers } from 'ethers'
import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Global, css, keyframes } from '@emotion/react'
import axios from 'axios'
import { isEmpty } from 'lodash'
import Draggable from 'react-draggable'

import styles from '../util/styles'
import { BLOCKCHAIN, PUBLIC_MINT_STATUS } from '../util/constants'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../util/contract'
import Face1 from '../../images/face.webp'
import Face2 from '../../images/face2.webp'
import Logo from '../../images/logo.webp'
import Hearts from '../../images/hearts.webp'
import Sunset from '../../images/weirdassets.webp'

const Background = styled.div`
  position: absolute;
  background-image: url("https://d2kq0urxkarztv.cloudfront.net/6009044a3570ec00785217d4/3338036/upload-f7009677-fb6c-495b-99d0-da54c85d6a2d.png?e=webp&nll=true");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeartContainer = styled.div`
  background-image: url("https://d2kq0urxkarztv.cloudfront.net/6009044a3570ec00785217d4/3338036/upload-e47ff6e0-d22f-472b-b7ec-7bbb3c8f81f9.png?w=400&e=webp&nll=true");
  background-size: cover;
  width: 350px;
  height: 350px;
  animation: heart-pulse 4s infinite;
  color: white;
  text-align: center;
  font-size: 26px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */

  a {
    -webkit-transform: rotate(-20deg) translate(10px, -20px);
    -moz-transform: rotate(-20deg) translate(10px, -20px);
    transform: rotate(-20deg) translate(10px, -20px);
    color: #fff;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }

  @keyframes heart-pulse {
    0% {
      transform: scale(0.6);
    }
    50% {
      transform: scale(0.75);
    }
    100% {
      transform: scale(0.6);
    }
  }

  @media screen and (max-width: 1200px) {
    left: -10px;
  }
`

const swing = keyframes`
  0% {
    transform: rotate(40deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(40deg);
  }
`

const sway = keyframes`
  0%,
  100% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(10deg);
  }
`

const StyledRoundButton = styled.button`
  z-index: 2;
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: #bf8bf9;
  padding: 10px;
  font-weight: bold;
  font-size: 22px;
  color: white;
  width: 45px;
  height: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`

const StyledButton = styled.button`
  z-index: 2;
  margin: 10px;
  font-family: "Your Doodle Font";
  font-weight: bold;
  font-size: 30px;
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: #fff;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  border: none;
  width: 250px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: 0.5s;
  background-image: linear-gradient(
    to right,
    #beeb96 0%,
    #fbc2da 51%,
    #9746f4 100%
  );
  cursor: pointer;
  display: inline-block;
  border-radius: 14px;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    margin: 8px 10px 12px;
    background-position: right center;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
`

const Mint = styled.div`
  padding: 10px 40px;
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

function App () {
  const [blockchainState, setBlockchainState] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mintAmount, setMintAmount] = useState(1)
  const [merkleProof, setMerkleProof] = useState()

  useEffect(async () => {
    const { accounts } = blockchainState

    if (
      accounts &&
      process.env.PUBLIC_MINT_STATUS === PUBLIC_MINT_STATUS.ALLOW_LIST
    ) {
      const proof = await getMerkleProof(accounts[0])

      setMerkleProof(proof)
    }
  }, [blockchainState])

  const connectWallet = async () => {
    setLoading(true)

    if (window.ethereum) {
      try {
        const { ethereum } = window
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        const chainId = await ethereum.request({ method: 'eth_chainId' })

        if (chainId !== BLOCKCHAIN.RINKEBY.id) {
          return setMessage(`Please connect to ${BLOCKCHAIN.RINKEBY.name}.`)
        }

        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        )
        const price = await contract.price()

        setBlockchainState((prevState) => ({
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

      await contract.allowListMint(merkleProof, mintAmount, {
        value,
        gasLimit,
      })
    } catch (e) {
      setMessage('Error occurred while minting.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) setMintAmount((prevState) => prevState - 1)
  }

  const incrementMintAmount = () => {
    if (mintAmount < 10) setMintAmount((prevState) => prevState + 1)
  }

  const walletConnected = blockchainState.price && blockchainState.contract

  return (
    <>
      <Global styles={styles} />
      <Background>
        <Draggable>
          <div
            css={css`
              position: absolute;
              top: 11%;
              left: 39%;
            `}
          >
            <img
              src={Logo}
              css={css`
                width: 420px;
                pointer-events: none;
                animation: ${sway} 5s ease-in-out forwards infinite;
              `}
            />
          </div>
        </Draggable>
        <Draggable>
          <div
            css={css`
              position: absolute;
              top: 29%;
              left: 59%;
            `}
          >
            <img
              src={Face1}
              css={css`
                width: 180px;
                pointer-events: none;
                animation: ${swing} 5.5s ease-in-out forwards infinite;
              `}
            />
          </div>
        </Draggable>
        <Draggable>
          <div
            css={css`
              position: absolute;
              top: 61%;
              left: 33%;
            `}
          >
            <img
              src={Face2}
              css={css`
                width: 200px;
                pointer-events: none;
                animation: ${swing} 5.5s ease-in-out forwards infinite;
              `}
            />
          </div>
        </Draggable>

        <Container>
          <HeartContainer
            css={css`
              margin-top: -10%;
            `}
          >
            <a
              href="http://discord.gg/ilyyw"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Weirdest
              <br />
              Discord Server
            </a>
          </HeartContainer>

          <Mint>
            <h2>Hello Weirdos!</h2>
            {loading && <div>Loading...</div>}
            {blockchainState.accounts && (
              <div>{blockchainState.accounts[0]}</div>
            )}
            <div>
              {blockchainState.price &&
                `${ethers.utils.formatEther(
                  blockchainState.price
                )} ETH to mint`}
            </div>
            <StyledButton onClick={connectWallet} disabled>
              Coming Soon...
            </StyledButton>
            <div>{message}</div>
            {walletConnected && (
              <div>
                <h2>Wallet Connected</h2>
                <div>
                  {isEmpty(merkleProof)
                    ? 'You are not on the allow list.'
                    : 'Allow list ✅ mint away.'}
                </div>
                <div>
                  <StyledRoundButton onClick={decrementMintAmount}>
                    -
                  </StyledRoundButton>{' '}
                  {mintAmount}{' '}
                  <StyledRoundButton onClick={incrementMintAmount}>
                    +
                  </StyledRoundButton>
                </div>
                <button onClick={mint}>Mint!</button>
              </div>
            )}
          </Mint>

          <HeartContainer
            css={css`
              margin-right: -10%;
              margin-bottom: -20%;
            `}
          >
            <a
              href="https://twitter.com/ilyywnft"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Weirdest
              <br />
              Twitter Profile
            </a>
          </HeartContainer>
        </Container>
      </Background>
    </>
  )
}

export default App
