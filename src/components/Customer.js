import React from 'react';
import PropTypes from 'prop-types';
import style from '../stylesheets/Customer.module.scss';

const Customer = (props) => {
  const { conversation } = props;
  const senderInfo = conversation ? conversation.senderInfo
    : {
      profile_pic: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
      first_name: 'Sender',
      last_name: 'Name',
    };
  return (
    <section className={style.main}>

      <section className={style.customerProfile}>
        <img src={senderInfo.profile_pic} alt="sender" />
        <h5 className={style.name}>{`${senderInfo.first_name} ${senderInfo.last_name}`}</h5>
        <p className={style.status}>
          <div />
          Online
        </p>
        <div className={style.callToAction}>
          <button type="button">
            <i className="las la-phone-alt" />
            <span>Call</span>
          </button>
          <button type="button">
            <i className="las la-user" />
            <span>Profile</span>
          </button>
        </div>
      </section>

      <section className={style.customerDetails}>
        <h5>Customer Details</h5>
        <ul>
          <li>
            <span>First Name: </span>
            <span>{senderInfo.first_name}</span>
          </li>

          <li>
            <span>Last Name: </span>
            <span>{senderInfo.last_name}</span>
          </li>
        </ul>

        <div className={style.viewMore}>
          <p>View More Details</p>
        </div>
      </section>
    </section>
  );
};

Customer.propTypes = {
  conversation: PropTypes.instanceOf(Object).isRequired,
};

export default Customer;
