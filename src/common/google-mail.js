import { useEffect } from 'react';
import { awaitWindowLoad } from './common';

const initGmailLib = ({ apiKey, clientId, scope, onInit, onError }) => {
  const params = {
    apiKey,
    clientId,
    discoveryDocs: [ 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest' ],
  };
  awaitWindowLoad(() => window.gapi, (gapi) => {
    gapi.load(
      'client',
      () => gapi.client.init(params).then(onInit, onError),
      onError,
    );
  });
};

export const useGoogleMail = ({ clientId, apiKey, scope, onInitialized, onInitializationError }) => {
  useEffect(() => {
    initGmailLib({
      apiKey,
      clientId,
      scope,
      onInit: () => {
        debugger;
        onInitialized(window.gapi.client.gmail);
      },
      onError: onInitializationError,
    });
  }, []);
};


