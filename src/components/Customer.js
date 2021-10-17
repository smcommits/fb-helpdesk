import React from 'react';
import style from '../stylesheets/Customer.module.scss';

const Customer = (props) => (
  <section className={style.main}>

    <section className={style.customerProfile}>
      <img src="https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="user" />
      <h5 className={style.mame}>Amit RG</h5>
      <p className={style.status}>Offline</p>
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
          <span>Email</span>
          <span>example@email.com</span>
        </li>

        <li>
          <span>First Name</span>
          <span>example@email.com</span>
        </li>

        <li>
          <span>Last Name</span>
          <span>example@email.com</span>
        </li>

      </ul>
    </section>
  </section>
);

export default Customer;
