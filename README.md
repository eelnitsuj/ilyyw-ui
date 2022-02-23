# I Like You, You're Weird

[![Tests](https://github.com/NFTMADE/ilyyw-ui/actions/workflows/tests.yml/badge.svg)](https://github.com/NFTMADE/ilyyw-ui/actions/workflows/tests.yml)

🌈 https://ilikeyouyoureweird.com/ 🌈

## Stack 🍔

This React app is built with Parcel, a fast and lightweight bundler. It can deployed with tools like Netlify or Vercel.

### Styling

See [Emotion](https://github.com/emotion-js/emotion).

## Development

### Install

```
yarn install
```

### Local Dev

Simply run

```sh
yarn start
```

to get started with developing locally.

## API

Serverless functions in `api/` are automatically deployed via Vercel. This way we don't have to expose a massive list of addresses to the front end. The less information we have exposed the better.


We can fetch the Merkle root with a simple HTTP request.

```
GET /api/merkle-root
```
