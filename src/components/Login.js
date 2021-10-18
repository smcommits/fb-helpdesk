import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Auth from '../core/services/authencation';

import styles from '../stylesheets/Login.module.scss';

const endpoint = 'https://helpdesk-fb.herokuapp.com';

const Login = (props) => {
  const { loginStatus, currentUser, setCurrentUser } = props;
  if (loginStatus || currentUser.accessToken) return null;

  const getProfile = (facebookID) => {
    FB.api(facebookID, { fields: 'name, picture' }, (response) => {
      if (response && !response.error) {
        const { name } = response;
        console.log()
        Auth.authenticate({ facebookID, name })
      }
    });
  };

  window.loginCallback = ({ authResponse }) => {
    if (authResponse) {
      const { userID } = authResponse;
      getProfile(userID);
      setCurrentUser(authResponse);
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

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProp = (dispatch) => ({
  setCurrentUser: (userObject) => {
    dispatch({ type: 'SET_CURRENT_USER_TRUE', payload: userObject });
  },
});

const connectedLogin = connect(mapStateToProps, mapDispatchToProp)(Login);

export default connectedLogin;
