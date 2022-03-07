import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { css } from '@emotion/react'

import { socialMedia } from '../../util/data'

const Menu = styled.div`
  z-index: 30;
  position: fixed;
  top: 90px;
  left: 32%;
  width: 60%;
  /* height: 300px; */
  background-color: rgb(167, 121, 243, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid #fff;
  border-radius: 10px;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100vw)')};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1.1rem;
`

const Divider = styled.div`
  margin-top: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
`

const linkStyles = css`
  color: #fff;
  margin-top: 1.1rem;
  margin-left: 1.1rem;
`

const StyledNavLink = styled(NavLink)`
  ${linkStyles}
`

const StyledA = styled.a`
  ${linkStyles}
  display: flex;
  align-items: center;

  svg {
    margin-right: 9px;
    fill: #fff;

    path {
      fill: #fff;
    }
  }
`

const MobileMenu = ({ open }) => {
  return (
    <Menu open={open}>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/about">About</StyledNavLink>
      <Divider />
      {socialMedia.map((social) => (
        <StyledA
          href={social.link}
          target="_blank"
          rel="noreferrer"
          key={social.name}
        >
          <social.Icon />
          <span>{social.name}</span>
        </StyledA>
      ))}
    </Menu>
  )
}

MobileMenu.propTypes = {
  open: PropTypes.bool,
}

export default MobileMenu
