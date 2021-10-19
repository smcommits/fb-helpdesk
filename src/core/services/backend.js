import axios from 'axios';

const backendAPI = (() => {
  const config = {
    baseURI: 'https://helpdesk-fb.herokuapp.com',
    createPage: '/page/new',
    sendMessage: '/webhook/send',
  };

  const createPage = (data) => {
    try {
      const res = axios.post(config.baseURI + config.createPage, data);
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const sendMessage = (data) => {
    try {
      const res = axios.post(config.baseURI + config.sendMessage, data);
      return res;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  return {
    createPage,
    sendMessage,
  };
})();

export default backendAPI;
