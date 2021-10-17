import React from 'react';
import style from '../stylesheets/Message.module.scss';

const Message = (props) => (
  <section className={style.main}>
    <div className={style.header}>
      <h3>Amit RG</h3>
    </div>

    <section className={style.chat}>
      <div className={`${style.singleText} ${style.sender}`}>
        <img src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="sender" />
        <div className={style.content}>
          <p className={style.text}>Is this in Stock Right now</p>
          <p className={style.time}> Amit RG - Mar 05, 2:22 AM</p>
          <p />
        </div>
      </div>

      <div className={`${style.singleText} ${style.user}`}>
        <img src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="user" />
        <div className={style.content}>
          <p className={style.text}>We have three left in Stock</p>
          <p className={style.time}> Amit RG - Mar 05, 2:22 AM</p>
          <p />
        </div>
      </div>
    </section>

    <div className={style.messageInput}>
      <input type="text" />
    </div>
  </section>
);

export default Message;
