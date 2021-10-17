import React from 'react';

const ConversationListItem = (props) => {
  const { styles } = props;
  return (
    <div className={`${styles.conversationItem} ${styles.active}`}>
      <div className={styles.top}>
        <input type="radio" />
        <div className={styles.messageInfo}>
          <h4 className={styles.name}>Amit RG</h4>
          <p className={styles.type}>FacebookDM</p>
        </div>
        <div className={styles.conversationTime}>
          <p>10m</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>Hi, do you have any availablity...</p>
      </div>
    </div>
  );
};

export default ConversationListItem;
