import axios from 'axios';

const facebookAppId = '305021061060953';

const FacebookSDK = (() => {
  const config = {
    baseURI: 'https://graph.facebook.com',
  };

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

  const subscribedApps = async (fields, accessToken, pageId) => {
    const url = new URL(`${config.baseURI}/${pageId}/subscribed_apps`);
    url.search = new URLSearchParams({
      access_token: accessToken,
      subscribed_fields: fields,
    });
    const res = await axios.post(url);
    if (res.ok) {
      return res;
    }
  };

  const getPageInfo = async () => {
    try {
      const res = await axios.get(`${config.baseURI}/me/accounts`);
      return res;
    } catch (err) {
      return err;
    }
  };

  const replyComment = async (commentID, accessToken, text) => {
    FB.api(`${commentID}/comments`, 'post', {
      message: text,
      access_token: accessToken,
    }, (res) => res);
  };

  return {
    initialize,
    getProfile,
    subscribedApps,
    getPageInfo,
    replyComment,
  };
})();

export default FacebookSDK;
