import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'

import BYimage from '../../images/beyourself.png'
import SLimage from '../../images/spreadlove.png'

const AboutContainer = styled(motion.section)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 769px) {
    margin-top: 80px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
const TextContainer = styled.div`
  width: 50%;
  max-height: 400px;
  text-align: center;
  color: #fff;

  @media all and (max-width: 768px) {
    width: 60%;
  }
`

const Pulse = keyframes`
  0% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(0.6);
  }
`

const WeirdoImg = styled.img`
  max-width: 360px;
  animation: ${Pulse} 4s infinite;

  @media all and (max-height: 768px) {
    max-width: 180px;
  }
`

function About () {
  return (
    <AboutContainer
      id="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <WeirdoImg src={BYimage} />
      <TextContainer>
        <h2>I Like You, You’re Weird</h2>
        <p>
          A Community-driven collectibles project featuring art by Amber Park
          and Mason Rothschild. Across the 10,000 Weirdos in our collection, no
          two are the same - much like humankind itself. Consider every weirdo
          minted representative of that that holder&apos;s inner weirdo. A
          cosmic embodiment of our one-of-a-kind oddities.
        </p>
      </TextContainer>
      <WeirdoImg src={SLimage} />
    </AboutContainer>
  )
}

export default About
