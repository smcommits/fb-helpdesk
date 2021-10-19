import React from 'react';
import PropTypes from 'prop-types';
import ConversationListItem from './ConversationListItem';

const CoversationList = (props) => {
  const {
    styles,
    conversations,
    currentUser,
    setActive,
    activeConversation,
  } = props;

  const conversationList = conversations.map((conversation) => (
    <ConversationListItem
      activeConversation={activeConversation}
      key={conversation.id}
      conversation={conversation}
      styles={styles}
      setActive={setActive}
      currentUser={currentUser}
      conversationType={conversation.type === 'comment' ? 'Facebook Post' : 'Facebook DM'}
    />
  ));
  return (
    <section className={styles.list}>
      <div className={styles.header}>
        <div className={styles.left}>
          <i className="las la-bars" />
          <h2>Conversations</h2>
        </div>
        <div className={styles.right}>
          <i className="las la-redo-alt" />
        </div>
      </div>
      {conversationList}
    </section>
  );
};

CoversationList.propTypes = {
  styles: PropTypes.instanceOf(Object).isRequired,
  conversations: PropTypes.instanceOf(Object).isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
  setActive: PropTypes.func.isRequired,
  activeConversation: PropTypes.instanceOf(Object).isRequired,
};

export default CoversationList;
