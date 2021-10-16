import { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Home from './Home';

function App(props) {
  const { loginResponse, setCurrentUser, currentUser } = props;
  const { authResponse, status } = loginResponse;

  if (status === 'connected') {
    setCurrentUser(authResponse);
  }
  return (
    <>
      <Login loginStatus={status} />
      {currentUser.accessToken && <Home />}
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
