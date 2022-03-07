import styled from '@emotion/styled'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { truncate } from 'lodash'

import { APP_NETWORK } from '../../util/blockchain'
import LogoImg from '../../../images/logo.webp'
import { socialMedia } from '../../util/data'
import Burger from './Burger'
import Button from '../Button'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  height: 80px;
  width: 100%;
  background: rgba(255, 255, 255, 0.33);
  justify-content: space-between;
  align-items: center;
  color: #000;
  z-index: 10;
`
const NavLeft = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 30px;
  align-items: center;
`
const NavRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 30px;

  @media all and (max-width: 625px) {
    display: none;
  }
`

const IconContainer = styled.li`
  display: flex;
  margin-right: 15px;
`

const SocialIconItem = styled.ul`
  width: 15px;

  svg {
    /* fill: white; */
    fill: #A779F3;

    path {
      /* fill: white; */
      fill: #A779F3
    }
  }
`

const Logo = styled.img`
  height: 40px;
`

function TopNav ({
  blockchainState,
  connectWallet,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const walletConnected = blockchainState.price && blockchainState.contract
  const correctChain = blockchainState.chainId === APP_NETWORK.id

  return (
    <Nav>
      <NavLeft>
        <Link to="/" alt="Home">
          <Logo src={LogoImg} alt="logo" />
        </Link>
      </NavLeft>
      <NavRight>
        <IconContainer>
          {socialMedia.map((social) => (
            <SocialIconItem key={social.name}>
              <a href={social.link} target="_blank" rel="noreferrer">
                <social.Icon />
              </a>
            </SocialIconItem>
          ))}
        </IconContainer>
        <Button
          size="skinny"
          theme="purple"
          css={css`
            margin-left: 1.4rem;
            min-width: 200px;
          `}
          onClick={connectWallet}
          disabled={walletConnected || !correctChain}
        >
          {walletConnected
            ? `Connected (${truncate(blockchainState.accounts[0], {
                length: 10,
              })})`
            : 'Connect Wallet'}
        </Button>
      </NavRight>
      <Burger open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
    </Nav>
  )
}

TopNav.propTypes = {
  blockchainState: PropTypes.object,
  connectWallet: PropTypes.func,
  mobileMenuOpen: PropTypes.bool,
  setMobileMenuOpen: PropTypes.func,
}

export default TopNav
