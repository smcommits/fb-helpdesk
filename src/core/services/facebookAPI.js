import axios from 'axios';

const facebookAppId = '398992005006851';

const FacebookSDK = (() => {
  const initialize = () => new Promise((resolve) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v12.0',
      });

      FB.AppEvents.logPageView();

      FB.getLoginStatus((response) => {
        console.log(response)
        resolve(response);
      });
    };

    (function (d, s, id) {
      let js; const
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });

  const getProfile = async (id) => {
    try {
      const res = await axios.get(`https://graph.facebook.com/${id}?fields=name,email,picture`);
      return res;
    } catch (err) {
      if (err.response) return err.response;
      return err;
    }
  };

  return {
    initialize,
    getProfile,
  };
})();

export default FacebookSDK;
