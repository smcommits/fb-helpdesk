import axios from 'axios';

const Auth = (() => {
  const endPoints = {
    baseURL: 'https://helpdesk-fb.herokuapp.com',
    authentication: '/authentication',
  };
  const authenticate = async (authData) => {
    try {
      const res = axios.post(endPoints.baseURL + endPoints.authentication, authData);
      return res;
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
