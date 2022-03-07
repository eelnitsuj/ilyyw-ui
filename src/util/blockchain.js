import Web3Modal from 'web3modal'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnect from '@walletconnect/web3-provider'

export const web3Modal = new Web3Modal({
  providerOptions: {
    walletlink: {
      package: CoinbaseWalletSDK,
      options: {
        appName: 'ILYYW',
        infuraId: process.env.INFURA_KEY,
      },
    },
    walletconnect: {
      package: WalletConnect,
      options: {
        infuraId: process.env.INFURA_KEY,
      },
    },
  },
})

export const NETWORKS = {
  MAINNET: {
    id: '0x1',
    name: 'Ethereum Mainnet',
  },
  RINKEBY: {
    id: '0x4',
    name: 'Rinkeby',
  },
}

export const PUBLIC_MINT_STATUS = {
  CLOSED: 0,
  RESERVED: 1,
  WEIRD_LIST: 2,
  PUBLIC: 3,
}

export const PAUSE = Boolean(process.env.PAUSE) || false

export const APP_NETWORK = process.env.ACTIVE_NETWORK
  ? NETWORKS[process.env.ACTIVE_NETWORK]
  : NETWORKS.RINKEBY
