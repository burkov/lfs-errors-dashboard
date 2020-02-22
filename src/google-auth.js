
const withAuth2 = (func) => {
  const auth2 = window.gapi.auth2.getAuthInstance();
  if (auth2 != null) {
    func(auth2);
  } else console.error(`FIXME ERROR`);
};

export const signOut = ({ onSuccess }) => {
  withAuth2((auth2) => auth2.signOut().then(auth2.disconnect().then(onSuccess)));
};

export const signIn = ({ onSuccess, onError }) => {
  withAuth2((auth2) => auth2.signIn().then(res => onSuccess(res), err => onError(err)));
};

export const initGoogleAuthLib = ({ clientId, hostedDomain, scope, onInit, onError }) => {
  const clientConfig = {
    client_id: clientId,
    cookie_policy: 'single_host_origin',
    hosted_domain: hostedDomain,
    fetch_basic_profile: true,
    ux_mode: 'popup',
    scope,
  };
  const googleLoadTimer = setInterval(() => {
    console.log('called');
    const gapi = window.gapi;
    if (gapi) {
      clearInterval(googleLoadTimer);
      gapi.load('auth2', () => {
        return gapi.auth2.init(clientConfig)
          .then((gauth) => {
            onInit(gauth);
          });
      }, onError);
    }
  }, 10);
};