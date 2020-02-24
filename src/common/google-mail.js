import { useEffect } from 'react';
import { awaitWindowLoad } from './common';
import _ from 'lodash';
import dayjs from 'dayjs';

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

const readInBatch = (client, ids) => {
  const batch = client.newBatch();
  ids.forEach((id) => {
    batch.add(client.request({
      path: `gmail/v1/users/me/messages/${id}`,
      params: {
        format: 'metadata',
        metadataHeaders: [ 'Subject', 'Date' ],
      },
    }));
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      batch.then(
        (response) => {
          const { result } = response;
          resolve(_.map(_.values(result), (e) => _.get(e, 'result')));
        },
        (e) => reject(e),
      );
    }, 300);
  });
};

export const getMessages = async (client, ids) => {
  if (_.isEmpty(ids)) return [];
  let result = [];
  for (const idsChunk of _.chunk(ids, 100)) {
    result = result.concat(await readInBatch(client, idsChunk));
  }
  return result;
};

export const listAllIds = async (client) => {
  let pageToken = undefined;
  let result = [];
  const after = dayjs().subtract(30, 'day').format('YYYY/MM/DD');
  const mailList = '(<jetprofile-prod-lfs-notifications.jetbrains.com>)';
  do {
    const { result: { messages, nextPageToken } } = await client.gmail.users.messages.list({
      userId: 'me',
      q: `list:${mailList} after:${after}`,
      pageToken,
    });
    result = result.concat(_.map(messages, ({ id }) => id));
    pageToken = nextPageToken;
  } while (!_.isNil(pageToken));

  return result;
};


