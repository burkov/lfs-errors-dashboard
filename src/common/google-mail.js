import {useEffect} from 'react';
import {awaitWindowLoad} from './common';
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

const applyChunkedAndConcat = async (ids, chunkSize, func) => {
  if (_.isEmpty(ids)) return [];
  let result = [];
  for (const idsChunk of _.chunk(ids, chunkSize)) {
    result = result.concat(await func(idsChunk));
  }
  return result;
};

const prepareBatchAndExecute = (client, ids, timeoutMs, prepare, parse) => {
  const batch = client.newBatch();
  ids.forEach((id) => {
    batch.add(prepare(id));
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      batch.then(
        (response) => {
          parse(response, resolve);
        },
        (e) => reject(e),
      );
    }, timeoutMs);
  });
};

export const moveToTrash = async (client, ids, onProgress) => {
  let total = 0;
  const chunkSize = 50;
  const timeoutMs = 300;
  return await applyChunkedAndConcat(ids, chunkSize, async (chunk) => {
    await prepareBatchAndExecute(client, chunk, timeoutMs,
      (id) => client.request({
        method: 'POST',
        path: `gmail/v1/users/me/messages/${id}/trash`,
      }),
      (response, resolve) => {
        const { result } = response;
        const uniqueCodes = _.uniq(_.map(_.values(result), (e) => _.get(e, 'status')));
        console.log(`codes: ${JSON.stringify(uniqueCodes)}`);
        resolve(undefined);
      });
    total += chunkSize;
    onProgress(total);
  });
};

export const getMessages = async (client, ids) => {
  return await applyChunkedAndConcat(ids, 100, (chunk) => {
    return prepareBatchAndExecute(client, chunk, 300,
      (id) => client.request({
        path: `gmail/v1/users/me/messages/${id}`,
        params: {
          format: 'metadata',
          metadataHeaders: [ 'Subject', 'Date' ],
        },
      }),
      (response, resolve) => {
        const { result } = response;
        resolve(_.map(_.values(result), (e) => _.get(e, 'result')));
      },
    );
  });
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


