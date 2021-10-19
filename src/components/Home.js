import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Conversation from './Conversation';
import FacebookAPI from '../core/services/facebookAPI';
import BackendAPI from '../core/services/backend';

const Home = (props) => {
  const { currentUser, setPage } = props;

  useEffect(() => {
    FB.api('/me/accounts', (response) => {
      const { access_token: accessToken, id } = response.data[0];
      setPage({ accessToken, id });
      FacebookAPI.subscribedApps('messages,feed', accessToken, id);
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
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setPage: (pageData) => {
    dispatch({ type: 'SET_PAGE', payload: pageData });
  },
});

Home.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
  setPage: PropTypes.func.isRequired,
};

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default connectedHome;
