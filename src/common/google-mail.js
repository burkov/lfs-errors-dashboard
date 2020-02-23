import {useEffect} from 'react';
import {awaitWindowLoad} from './common';
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
        onInitialized(window.gapi.client);
      },
      onError: onInitializationError,
    });
  }, []);
};

export const getMessages = async (client, ids) => {
  if (_.isEmpty(ids)) return [];
  const batch = client.newBatch();
  ids.forEach((id) => {
    batch.add(client.request({
      path: `gmail/v1/users/me/messages/${id}`,
      params: {
        format: 'metadata',
        metadataHeaders: ['Subject', 'Date', ]
      },
    }));
  });
  return new Promise((resolve, reject) => {
    batch.then(
      (response) => {
        const { result } = response;
        resolve(_.map(_.values(result), (e) => _.get(e, 'result')));
      },
      (e) => reject(e),
    );
  });
};

export const listAllIds = async (client) => {
  let pageToken = undefined;
  let result = [];
  do {
    const { result: { messages, nextPageToken } } = await client.gmail.users.messages.list({
      userId: 'me',
      q: 'list:(<jetprofile-prod-lfs-notifications.jetbrains.com>)',
      pageToken,
    });
    result = result.concat(messages.map(({id}) => id));
    pageToken = nextPageToken;
  } while (!_.isNil(pageToken));

  return result;
};


