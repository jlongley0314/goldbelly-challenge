# Getting Started with Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run project

- Add a .env file to the root folder and add the following values:

```
REACT_APP_API_URL=https://api.bely.me
REACT_APP_API_KEY=a4aee765512fa6052a6a61fa17d1c279
```

- Install dependencies by running:

```
npm install
```

- Start the app with

```
npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## To run the automated test suite

- Run

```
npm test
```

## Reasons for some of my development decisions

- I chose to add the api url and access token to a .env to simulate hiding these values in a production envrionment.
- Even though this is a single page application, I added `react-router` so that it can be easily updated if more pages are needed.
- I went with using `react-router` because it is a library that I've enjoyed using over the last couple months. This library gives state management to the server side rather than the client side (like in Redux). For the most part, it can replace client-state libraries and any boilerplate code for actions, reducers, etc.
