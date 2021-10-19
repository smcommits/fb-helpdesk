import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CoversationList from './CoversationList';
import socket from '../core/services/socket';
import styles from '../stylesheets/Conversation.module.scss';
import { addMessages, addComment } from '../reducers/conversation';
import Message from './Message';
import Customer from './Customer';

const Conversation = (props) => {
  const [activeConversation, setActiveConversation] = useState({});
  const {
    currentUser, pushMessage, conversations, page, pushComment,
  } = props;

  const handleReceivedMessage = (message) => {
    FB.api(`/${message.senderPSID}`,
      {
        fields: 'first_name, last_name, profile_pic',
        access_token: page.accessToken,
      }, (senderInfo) => {
        if (senderInfo.error) {
          return null;
        }
        if (message.type === 'comment') {
          pushComment(message, senderInfo);
        } else {
          pushMessage(message, senderInfo);
        }
      });
  };

  const initializeSocketConnection = () => {
    socket.on('connect', () => {
      socket.emit('join', `message${currentUser.userID}`);
    });
    socket.on('message', (data) => {
      handleReceivedMessage(data);
    });
  };

  const findActiveConversation = () => conversations.find(
    (conversation) => conversation.id === activeConversation,
  );

  useEffect(() => {
    initializeSocketConnection();

    return () => {
      socket.off('message');
    };
  });

  return (
    <>
      <CoversationList
        active={activeConversation}
        setActive={setActiveConversation}
        conversations={conversations}
        styles={styles}
        currentUser={currentUser}
      />
      <Message
        conversation={findActiveConversation()}
        handReceived={handleReceivedMessage}
        currentUser={currentUser}
        page={page}
      />
      <Customer
        conversation={findActiveConversation()}
        currentUser={currentUser}
        page={page}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  conversations: state.conversations,
  page: state.page,
});

const mapDispatchToProps = (dispatch) => ({
  pushMessage: (message, senderInfo) => {
    dispatch(addMessages(message, senderInfo));
  },
  pushComment: (message, senderInfo) => {
    dispatch(addComment(message, senderInfo));
  },
});

Conversation.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
  pushMessage: PropTypes.func.isRequired,
  conversations: PropTypes.instanceOf(Object).isRequired,
  page: PropTypes.instanceOf(Object).isRequired,
  pushComment: PropTypes.func.isRequired,
};

const ConnectedConversation = connect(mapStateToProps, mapDispatchToProps)(Conversation);

export default ConnectedConversation;
