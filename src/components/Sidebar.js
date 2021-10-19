import React from 'react';
import styles from '../stylesheets/Sidebar.module.scss';

const Sidebar = () => (
  <section className={styles.main}>
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <i className="lab la-facebook" />
        </li>
        <li className={`${styles.navItem} ${styles.active}`}>
          <i className="las la-envelope-open-text" />
        </li>
        <li className={styles.navItem}>
          <i className="las la-user-friends" />
        </li>
        <li className={styles.navItem}>
          <i className="las la-chart-area" />
        </li>
      </ul>
    </nav>
  </section>
);

export default Sidebar;
