import axios from 'axios';

console.log(axios)
const RequestClients = (() => {
  const authClient = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URI,
    params: {},
  });

  return {
    authClient,
  };
});

export default RequestClients;
