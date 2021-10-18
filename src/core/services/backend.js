import axios from 'axios';

const backendAPI = (() => {
  const config = {
    baseURI: 'http://localhost:5000',
    createPage: '/page/new',
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

  return {
    createPage,
  };
})();

export default backendAPI;
