import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Conversation from './Conversation';
import Customer from './Customer';

const Home = (props) => {
  const a = '';
  return (
    <section>
      <Sidebar />
      <Conversation />
      <Customer />
    </section>
  );
};

export default Home;
