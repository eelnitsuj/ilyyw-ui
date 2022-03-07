import 'normalize.css'
import { css } from '@emotion/react'

export const styles = css`
  html {
    box-sizing: border-box;
  }

  body {
    font-family: "Your Doodle Font";
    cursor: url(https://d2kq0urxkarztv.cloudfront.net/6009044a3570ec00785217d4/upload-7e2b7536-3f65-4f66-8f76-b70021e1a994.png),
      auto;
    cursor: -webkit-image-set(
      url(https://d2kq0urxkarztv.cloudfront.net/6009044a3570ec00785217d4/upload-7e2b7536-3f65-4f66-8f76-b70021e1a994.png?w=25) 1x,
      url(https://d2kq0urxkarztv.cloudfront.net/6009044a3570ec00785217d4/upload-7e2b7536-3f65-4f66-8f76-b70021e1a994.png) 2x
    ), auto;
  }

  a {
    text-decoration: none;
    text-decoration-color: none;
  }
`

export default styles
