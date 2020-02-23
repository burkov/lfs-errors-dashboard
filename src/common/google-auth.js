import { useEffect } from 'react';
import _ from 'lodash';

const initGoogleAuthLib = ({ clientId, hostedDomain, scope, onInit, onError }) => {
  const clientConfig = {
    client_id: clientId,
    cookie_policy: 'single_host_origin',
    hosted_domain: hostedDomain,
    fetch_basic_profile: true,
    ux_mode: 'popup',
    scope,
  };
  const googleLoadTimer = setInterval(() => {
    const gapi = window.gapi;
    if (gapi) {
      clearInterval(googleLoadTimer);
      gapi.load('auth2', () => {
        return gapi.auth2.init(clientConfig)
          .then((auth2) => {
            onInit(auth2);
          });
      }, onError);
    }
  }, 10);
};


const getAuthData = (auth2) => {
  const user = auth2.currentUser.get();
  if (user === undefined) return {
    isSignedIn: false,
    profile: {},
    tokens: {},
  };
  const basicProfile = user.getBasicProfile();
  const authResponse = user.getAuthResponse();
  const isSignedIn = user.isSignedIn();
  const profile = basicProfile === undefined ? {} : {
    googleId: basicProfile.getId(),
    imageUrl: basicProfile.getImageUrl(),
    email: basicProfile.getEmail(),
    name: basicProfile.getName(),
    givenName: basicProfile.getGivenName(),
    familyName: basicProfile.getFamilyName(),
  };
  const tokens = authResponse === undefined ? {} : {
    idToken: authResponse.id_token,
    accessToken: authResponse.access_token,
  };
  return {
    isSignedIn,
    profile,
    tokens,
  };
};

export const useGoogleAuth = (
  {
    clientId,
    hostedDomain,
    scope,
    onInitialized,
    onInitializationError,
    onSignedIn,
    onSignedOut,
  }) => {
  useEffect(() => {
    const onInit = (auth2) => {
      auth2.isSignedIn.listen((isSignedIn) => {
        isSignedIn ? onSignedIn(getAuthData(auth2)) : onSignedOut();
      });
      const signIn = () => auth2.signIn().then(_.noop, err => console.error(`Got error:`, err));
      const signOut = () => auth2.signOut().then(auth2.disconnect());
      onInitialized({ signIn, signOut });
      const authData = getAuthData(auth2);
      const { isSignedIn } = authData;
      if (isSignedIn) onSignedIn(authData);
    };
    const onError = (error) => {
      onInitializationError(error);
    };
    initGoogleAuthLib({ clientId, hostedDomain, scope, onInit, onError });
  }, []);
};

