import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';

import styles from '../stylesheets/Login.module.scss';

const Login = (props) => {
  const { loggedIn, setCurrentUser } = props;

  if (loggedIn) return null;
  return (
    <div className={styles.main}>
      <h2>Please login using Facebook to use the app.</h2>
      <div
        className="fb-login-button"
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
        data-scope="public_profile, email, user_posts, user_messenger_contact, user_location"
      />
    </div>
  );
};

const mapDispatchToProp = (dispatch) => ({
  setCurrentUser: (userObject) => {
    dispatch({ type: 'SET_CURRENT_USER_TRUE', payload: userObject });
  },
});

const connectedLogin = connect(null, mapDispatchToProp)(Login);

export default connectedLogin;
