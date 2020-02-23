import { useEffect } from 'react';
import { awaitWindowLoad } from './common';

const initGmailLib = ({ apiKey, onInit, onError }) => {
  const params = {
    apiKey: apiKey,
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

export const useGoogleMail = ({ apiKey, onInitialized, onInitializationError }) => {
  useEffect(() => {
    initGmailLib({
      apiKey,
      onInit: () => {
        onInitialized(window.gapi.client.gmail);
      },
      onError: onInitializationError,
    });
  }, []);
};

export const listAllIds = async (client) => {
  
  const response = await client.users.messages.list({
    userId: 'me',
    q: 'list:(<jetprofile-prod-lfs-notifications.jetbrains.com>)'
  });

  return response;
};


