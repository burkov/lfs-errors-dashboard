import { useEffect } from 'react';
import { awaitWindowLoad } from './common';
import _ from 'lodash';

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
  let pageToken = undefined;
  let result = [];
  do {
    const { result: { messages, nextPageToken } } = await client.users.messages.list({
      userId: 'me',
      q: 'list:(<jetprofile-prod-lfs-notifications.jetbrains.com>)',
      pageToken,
    });
    result = result.concat(messages);
    pageToken = nextPageToken;
  } while (!_.isNil(pageToken));

  return result;
};


