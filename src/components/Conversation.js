import React from 'react';
import CoversationList from './CoversationList';
import styles from '../stylesheets/Conversation.module.scss';
import Message from './Message';

const Conversation = (props) => (
  <>
    <CoversationList styles={styles} />
    <Message />
  </>
);

export default Conversation;
