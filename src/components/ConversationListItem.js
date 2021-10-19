import React from 'react';
import * as timeago from 'timeago.js';
import PropTypes from 'prop-types';

const ConversationListItem = (props) => {
  const {
    styles,
    conversation,
    setActive,
    activeConversation,
    conversationType,
  } = props;

  const lastMessage = conversation.messages[conversation.messages.length - 1] || {};
  const previewText = lastMessage ? lastMessage.text : '';
  const active = activeConversation === conversation.id;

  const timeAgo = timeago.format(lastMessage.time);
  const sender = conversation.senderInfo;

  const { first_name: firstName, last_name: lastName } = sender;

  return (
    <div
      className={`${styles.conversationItem} ${active ? styles.active : ''}`}
      onClick={() => { setActive(conversation.id); }}
      role="presentation"
    >
      <div className={styles.top}>
        <input type="radio" />
        <div className={styles.messageInfo}>
          <h4 className={styles.name}>{`${firstName} ${lastName}`}</h4>
          <p className={styles.type}>{conversationType}</p>
        </div>
        <div className={styles.conversationTime}>
          <p>{timeAgo}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>{previewText.length > 40 ? `${previewText.slice(0, 40)}...` : previewText}</p>
      </div>
    </div>
  );
};

ConversationListItem.propTypes = {
  styles: PropTypes.instanceOf(Object).isRequired,
  conversation: PropTypes.instanceOf(Object).isRequired,
  setActive: PropTypes.func.isRequired,
  activeConversation: PropTypes.instanceOf(Object).isRequired,
  conversationType: PropTypes.string.isRequired,
};
export default ConversationListItem;
