import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Global } from '@emotion/react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'

import styles from '../util/styles'
import TopNav from './TopNav'
import MobileMenu from './TopNav/MobileMenu'
import Mint from './Mint'
import About from './About'
import Footer from './Footer'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../util/contract'
import { web3Modal } from '../util/blockchain'
import Background from '../../images/weirdassets.webp'

const Oval = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 750px;
  height: 250px;
  border-radius: 375px / 125px;
  background-color: white;
  transform: rotate(-12deg) translate(-50%, -50%);
  z-index: -1;
  opacity: 0.2;
`

const ContentContainer = styled.div`
  position: fixed;
  display: flex;
  overflow: hidden;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`

function App () {
  const [blockchainState, setBlockchainState] = useState({})
  const [walletConnecting, setWalletConnecting] = useState(false)
  const [ethereum, setEthereum] = useState()
  const [provider, setProvider] = useState()
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(async () => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        })
        setBlockchainState((prevState) => ({ ...prevState, chainId }))
        console.log('chainId')
        console.log(chainId)
      }
    })
  }, [])

  useEffect(() => {
    if (ethereum?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('account changed')
        setBlockchainState((prevState) => ({ ...prevState, accounts }))
      }

      const handleChainChanged = (chainId) => {
        console.log('chain changed', chainId)
        setBlockchainState((prevState) => ({ ...prevState, chainId }))
      }

      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('chainChanged', handleChainChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [ethereum])

  const connectWallet = async () => {
    try {
      setWalletConnecting(true)

      const ethereum = await web3Modal.connect()
      setEthereum(ethereum)

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      const chainId = await ethereum.request({ method: 'eth_chainId' })

      const provider = new ethers.providers.Web3Provider(ethereum)
      setProvider(provider)

      console.log('Wallet connected. Connecting to contract now...')

      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      )
      const price = await contract.price()

      console.log('Contract connected.')

      setBlockchainState((prevState) => ({
        ...prevState,
        accounts,
        chainId,
        contract,
        price,
      }))

      setMessage('Wallet connected.')
    } catch (e) {
      console.error('There was an issue connecting your wallet:', e)
    } finally {
      setWalletConnecting(false)
    }
  }

  return (
    <>
      <Global styles={styles} />
      <TopNav
        blockchainState={blockchainState}
        connectWallet={connectWallet}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={() => setMobileMenuOpen((prevState) => !prevState)}
      />
      <MobileMenu open={mobileMenuOpen} />
      <ContentContainer>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Mint
                  blockchainState={blockchainState}
                  connectWallet={connectWallet}
                  walletConnecting={walletConnecting}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        <Oval />
      </ContentContainer>

      <Footer />
    </>
  )
}

export default App
