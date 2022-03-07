import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.33);
  border: 1px solid #ffffff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media all and (max-width: 860px) {
    display: none;
  }
`

function Footer () {
  const navigate = useNavigate()
  const returnHome = useCallback(
    () => navigate('/', { replace: true }),
    [navigate]
  )
  const goAbout = useCallback(
    () => navigate('/about', { replace: true }),
    [navigate]
  )
  return (
    <FooterContainer>
      <Button size="normal" theme="red" onClick={returnHome}>
        <Link to="/about"></Link>
        Home
      </Button>
      <Button size="normal" theme="purple" onClick={goAbout}>
        About
      </Button>
      <Button
        size="normal"
        theme="purple"
        onClick={() => {
          window.open('https://opensea.io/collection/ilyyw', '_blank')
        }}
      >
        Opensea
      </Button>
      <Button
        size="normal"
        theme="purple"
        onClick={() => {
          window.open('https://discord.gg/ilyyw', '_blank')
        }}
      >
        Discord
      </Button>
      <Button
        size="normal"
        theme="purple"
        onClick={() => {
          window.open('https://twitter.com/ILYYWNFT', '_blank')
        }}
      >
        Twitter
      </Button>
      <Button
        size="normal"
        theme="purple"
        onClick={() => {
          window.open(
            'https://www.instagram.com/ilikeyouyoureweird/',
            '_blank'
          )
        }}
      >
        Instagram
      </Button>
      <Button
        size="normal"
        theme="orange"
        onClick={() => {
          window.open(
            'https://opensea.io/collection/ilyyw-honoraries',
            '_blank'
          )
        }}
      >
        Honoraries
      </Button>
    </FooterContainer>
  )
}

export default Footer
