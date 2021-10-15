const facebookAppId = '606478270384683';

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
        console.log(response);
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

  return {
    initialize,
  };
})();

export default FacebookSDK;
