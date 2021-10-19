import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Login';
import Home from './Home';

function App(props) {
  const { loginResponse, setCurrentUser, currentUser } = props;
  const { authResponse } = loginResponse;

  if (authResponse) {
    setCurrentUser(authResponse);
  }

  return (
    <>
      <Login loginStatus={authResponse} />
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

App.propTypes = {
  loginResponse: PropTypes.instanceOf(Object).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
};

export default connectedApp;
