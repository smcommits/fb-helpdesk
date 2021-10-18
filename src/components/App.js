import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import Login from './Login';
import Home from './Home';

function App(props) {
  const { loginResponse, setCurrentUser, currentUser } = props;
  const { authResponse, status } = loginResponse;
  console.log(currentUser)

  if (authResponse) {
    setCurrentUser(authResponse);
  }

  return (
    <>
      <Login loginStatus={authResponse} />
      {currentUser.accessToken && <Home/>}
    </>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProp = (dispatch) => ({
  setCurrentUser: (userObject) => {
    dispatch({ type: 'SET_CURRENT_USER_TRUE', payload: userObject });
  },
});

const connectedApp = connect(mapStateToProps, mapDispatchToProp)(App);

export default connectedApp;
