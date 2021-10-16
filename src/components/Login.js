import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import Auth from '../core/services/authencation';

import styles from '../stylesheets/Login.module.scss';

const Login = (props) => {
  const { loginStatus, setCurrentUser } = props;
  if (loginStatus === 'connected') return null;

  const getProfile = (facebookID) => {
    FB.api(facebookID,
      { fields: 'name, picture' },
      (response) => {
        if (response && !response.error) {
          console.log(response)
          const { name } = response;
          Auth.authenticate({ facebookID, name });
        }
      });
  };

  window.loginCallback = ({ authResponse, status }) => {
    if (status === 'connected') {
      console.log('here');
      const { userID } = authResponse;
      const profile = getProfile(userID);
      setCurrentUser(authResponse);
      // Auth.authenticate(authResponse).then((res) => console.log(res));
    }
  };

  return (
    <div className={styles.main}>
      <div
        className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="login_with"
        data-layout="rounded"
        data-auto-logout-link="false"
        data-use-continue-as="false"
        data-onlogin="loginCallback"
        data-scope="public_profile, email, user_messenger_contact, pages_messaging, pages_show_list, pages_read_user_content, pages_manage_metadata"
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
