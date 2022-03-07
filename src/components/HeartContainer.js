import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const heartPulse = keyframes`
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

const HeartContainer = styled.div`
  background-image: url("https://d2kq0urxkarztv.cloudfront.net/6009044a3570ec00785217d4/3338036/upload-e47ff6e0-d22f-472b-b7ec-7bbb3c8f81f9.png?w=400&e=webp&nll=true");
  background-size: cover;
  background-repeat: no-repeat;
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position-y: ${(props) => props.backgroundPositionY || '17px'};

  animation: ${heartPulse} 4s infinite;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`

export default HeartContainer
