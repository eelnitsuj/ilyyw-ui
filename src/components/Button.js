import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const SIZE_MAP = {
  normal: {
    padding: '0.7rem 1rem',
    height: '2.8rem',
    fontSize: '1rem',
  },
  skinny: {
    padding: '0.7rem 1rem',
    height: '2.4rem',
    fontSize: '0.9rem',
  },
}

// NOTE: You can use any type of color, hex, rgb, etc.
const THEME_MAP = {
  green: {
    backgroundColor: 'lightgreen',
    boxShadowColor: '#fff',
  },
  red: {
    backgroundColor: '#ff5989',
    boxShadowColor: '#fff',
  },
  orange: {
    backgroundColor: '#FCB555',
    boxShadowColor: '#fff',
  },
  purple: {
    backgroundColor: '#A779F3',
    boxShadowColor: '#fff',
  },
}

export const StyledButton = styled.button`
  /* min-width: 200px; */
  width: 12%;
  border-radius: 10px;
  border: 1px solid black;
  padding: ${({ size }) => SIZE_MAP[size].padding};
  height: ${({ size }) => SIZE_MAP[size].height};
  font-size: ${({ size }) => SIZE_MAP[size].fontSize};

  background-color: ${({ theme }) =>
    THEME_MAP[theme].backgroundColor || '#000'};
  box-shadow: inset 0 -3px ${({ theme }) => THEME_MAP[theme].boxShadowColor || 'rgb(100, 176, 100)'};
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #88f186;
  }

  &:disabled,
  &:hover:disabled {
    cursor: not-allowed;
    background-color: lightgray;
  }
`

function Button ({ children, theme, ...props }) {
  return (
    <StyledButton theme={theme} {...props}>
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  size: 'normal',
  theme: 'purple',
}

// Don't forget to add available sizes and themes here.
Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  size: PropTypes.oneOf(['normal', 'skinny']),
  theme: PropTypes.oneOf(['green', 'red', 'orange', 'purple']),
}

export default Button
