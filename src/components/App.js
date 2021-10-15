import { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import FacebookSDK from '../core/helpers/facebookAPI';

function App(props) {
  const { loggedIn } = props;
  return (
    <>
      <Login loggedIn={loggedIn}/>
    </>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const connectedApp = connect(mapStateToProps, null)(App);

export default connectedApp;
