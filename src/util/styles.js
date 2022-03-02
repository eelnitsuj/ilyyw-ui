import 'normalize.css'
import { css } from '@emotion/react'

// import '../fonts/your-doodle-font.regular.woff2'
// import '../fonts/your-doodle-font.regular.woff'
// import '../fonts/your-doodle-font.regular.ttf'

export const styles = css`
  @font-face {
    font-family: 'Your Doodle Font';
    font-style: normal;
    src: local('Your Doodle Font'), local('YourDoodleFont'),
         url('./fonts/your-doodle-font.regular.woff2') format('woff2'),
         url('./fonts/your-doodle-font.regular.woff')  format('woff'),
         url('./fonts/your-doodle-font.regular.ttf')   format('truetype'),
         url('./fonts/your-doodle-font.regular.otf')   format('opentype');
  }
`

export default styles
