import React from 'react'

const Home = props => {

  FB.api('/me/accounts', (response) => {
      console.log(response);
    });
  return (
    <h1>Home</h1>
  )
}

export default Home
