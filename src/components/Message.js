import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from '../stylesheets/Message.module.scss';
import { addMessages, addComment } from '../reducers/conversation';
import BackendAPI from '../core/services/backend';
import FacebookAPI from '../core/services/facebookAPI';

const Message = (props) => {
  const {
    conversation, currentUser, page, pushMessage, pushComment,
  } = props;
  const { messages } = conversation || {};

  if (messages === undefined) {
    return (

      <section className={style.main}>
        <div className={style.header}>
          <h3>No Messages</h3>
        </div>
        <section className={style.chat} />
      </section>

    );
  }

  let embedURL;

  if (conversation.type === 'comment') {
    const searchFields = conversation.permalink.split('?')[1];
    const searchParams = new URLSearchParams(searchFields);
    embedURL = `https://www.facebook.com/${searchParams.get('story_fbid')}/posts/${searchParams.get('id')}`;
  }

  const endDiv = useRef();

  useEffect(() => {
    endDiv.current.scrollIntoView({ behavior: 'smooth' });
    FB.XFBML.parse();
  });

  const { commentID } = messages[messages.length - 1];

  const handleComment = (text) => {
    const commentInstance = {
      postID: conversation.postID,
      senderPSID: conversation.senderID,
      message: {
        text,
        time: Date.now(),
        senderID: currentUser.userID,
        recieverID: conversation.senderID,
        conversation: conversation.id,
      },

    };

    FacebookAPI.replyComment(commentID, page.accessToken, text);

    pushComment(commentInstance);
  };

  const handleMessage = (text) => {
    const requestBody = {
      pageAccessToken: page.accessToken,
      senderPSID: conversation.senderInfo.id,
      text,
    };

    const messageInstance = {
      message: {
        text,
        senderID: currentUser.userID,
        recieverID: conversation.senderInfo.id,
        time: Date.now(),
        conversation: conversation.id,
      },
    };

    BackendAPI.sendMessage(requestBody);
    pushMessage(messageInstance);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    e.target[0].value = '';

    if (conversation.type === 'comment') {
      handleComment(text);
    } else {
      handleMessage(text);
    }
  };

  const messageList = messages.map((message) => {
    let time = new Date(Number(message.time));
    time = time.toLocaleString('en-US', {
      month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric', hour12: true,
    });
    const recieved = message.recieverID === currentUser.userID;

    const imageLink = recieved ? conversation.senderInfo.profile_pic : 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U';
    return (
      <div className={`${style.singleText} ${recieved ? style.sender : style.user}`} key={message.id}>
        <img src={imageLink} alt="sender" />
        <div className={style.content}>
          <p className={style.text}>{message.text}</p>
          <p className={style.time}>{time}</p>
          <p />
        </div>
      </div>
    );
  });
  return (
    <section className={style.main}>
      <div className={style.header}>
        <h3>{`${conversation.senderInfo.first_name} ${conversation.senderInfo.last_name}`}</h3>
      </div>

      <section className={style.chat}>
        {conversation.type === 'comment' && (
        <div className={style.embedWrapper}>
          <div className="fb-post" data-href={embedURL} />
        </div>
        )}
        {messageList}
        <div ref={endDiv} />
      </section>

      <div className={style.messageInput}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder={`Send a message to ${conversation.senderInfo.first_name}`} />
          <input type="submit" value="Submit" style={{ display: 'none' }} />
        </form>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  pushMessage: (message) => {
    dispatch(addMessages(message));
  },
  pushComment: (comment) => {
    dispatch(addComment(comment));
  },
});

Message.propTypes = {
  conversation: PropTypes.instanceOf(Object).isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
  page: PropTypes.instanceOf(Object).isRequired,
  pushMessage: PropTypes.func.isRequired,
  pushComment: PropTypes.func.isRequired,
};

const ConnectedMessage = connect(null, mapDispatchToProps)(Message);

export default ConnectedMessage;
