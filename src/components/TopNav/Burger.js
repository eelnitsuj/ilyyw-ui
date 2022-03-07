import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledBurger = styled.button`
  display: none;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 20;
  margin-right: 30px;

  @media all and (max-width: 625px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? '#0D0C1D' : '#EFFFFA')};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

const Burger = ({ open, setOpen }) => (
  <StyledBurger open={open} onClick={setOpen}>
    <div />
    <div />
    <div />
  </StyledBurger>
)

Burger.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}

export default Burger
