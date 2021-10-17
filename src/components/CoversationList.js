import React from 'react';
import ConversationListItem from './ConversationListItem';

const CoversationList = (props) => {
  const { styles } = props;
  const a = '';
  return (
    <section className={styles.list}>
      <div className={styles.header}>
        <div className={styles.left}>
          <i className="las la-bars" />
          <h2>Conversations</h2>
        </div>
        <div className={styles.right}>
          <i className="las la-bars" />
        </div>
      </div>
      <ConversationListItem styles={styles} />
    </section>
  );
};

export default CoversationList;
