import axios from 'axios';

const Auth = (() => {
  const endPoints = {
    baseURL: 'http://localhost:5000',
    authentication: '/authentication',
  };
  const authenticate = async (authData) => {
    try {
      const res = axios.post(endPoints.baseURL + endPoints.authentication, authData);
      return res
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  return {
    authenticate,
  };
})();

export default Auth;
