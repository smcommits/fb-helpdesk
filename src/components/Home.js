import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Conversation from './Conversation';
import Customer from './Customer';
import FacebookAPI from '../core/services/facebookAPI';
import BackendAPI from '../core/services/backend';

const Home = (props) => {
  const { currentUser } = props;

  useEffect(() => {
    FB.api('/me/accounts', (response) => {
      const { access_token: accessToken, id } = response.data[0];
      FacebookAPI.subscribedApps('messages,feed', accessToken, id);
      console.log(response)
      BackendAPI.createPage({
        pageID: id,
        facebookID: currentUser.userID,
      });
    });
  }, []); 

  return (
    <section>
      <Sidebar />
      <Conversation />
      <Customer />
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const connectedHome = connect(mapStateToProps, null)(Home);

export default connectedHome;
