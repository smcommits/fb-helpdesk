import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CoversationList from './CoversationList';
import socket from '../core/services/socket';
import styles from '../stylesheets/Conversation.module.scss';
import Message from './Message';

const Conversation = (props) => {
  const [activeConversation, setActiveConversation] = useState({});
  const { currentUser, initializeConversation, conversations} = props;

  const initializeSocketConnection = () => {
    socket.on('connect', () => {
      socket.emit('join', `message${currentUser.userID}`);
    });
    socket.on('message', (data) => {
      handleReceivedMessage(data);
    });
  };

  const handleReceivedMessage = (message) => {
    initializeConversation(message);
  };

  const conversationExists = (conversations) => {

  }

  useEffect(() => {
    initializeSocketConnection();

    return () => {
      socket.off('message');
    };
  });

  return (
    <>
      <CoversationList styles={styles} />
      <Message />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  conversations: state.conversations,
});

const mapDispatchToProps = (dispatch) => ({
  initializeConversation: (message) => {
    dispatch({ type: 'NEW_CONVERSATION', payload: { id: message.message.conversation, messages: [message.message], sender: message.senderPSID } });
  },
});

const ConnectedConversation = connect(mapStateToProps, mapDispatchToProps)(Conversation);

export default ConnectedConversation;
