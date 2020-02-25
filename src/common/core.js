import localforage from 'localforage';
import {Set} from 'immutable';
import _ from 'lodash';
import dayjs from 'dayjs';


const mainStorage = localforage.createInstance({
  name: 'led-main',
});

const mailsStorage = localforage.createInstance({
  name: 'led-mails',
});

const transformSavedReadIds = async (func) => {
  const oldReadIds = await getReadIds();
  const newReadIds = func(oldReadIds);
  await mainStorage.setItem('read-ids', newReadIds.toArray());
  return newReadIds;
};

export const markRead = (newIds) =>
  transformSavedReadIds((readIds) => readIds.union(newIds));

export const markUnread = (newIds) =>
  transformSavedReadIds((readIds) => readIds.subtract(newIds));

/**
 * @returns Set<String>
 */
export const getReadIds = async () => {
  return Set((await mainStorage.getItem('read-ids')) || []);
};

export const filterNewIds = async (ids) => {
  const knownKeys = Set(await mailsStorage.keys());
  return _.filter(ids, (e) => !knownKeys.has(e));
};

const sanitizeSubject = (subject) => {
  return subject.replace(/^(jetprofile-prod RT error: )/, '');
};

export const allSavedIds = () => {
  return mailsStorage.keys();
};

export const saveMessages = async (messages) => {
  for (const message of messages) {
    try {
      const { id, payload: { headers } } = message;
      const { value: date } = _.find(headers, ({ name }) => name.toLowerCase() === 'date');
      const { value: subject } = _.find(headers, ({ name }) => name.toLowerCase() === 'subject');

      await mailsStorage.setItem(id, { date, subject: sanitizeSubject(subject) });
    } catch (e) {
      console.error(`failed to parse or save message`, message, e);
    }
  }
};

export const getAggregatedMessages = async (ids) => {
  const messages = await Promise.all(ids.map(async (id) => {
    let message = await mailsStorage.getItem(id);
    if (message === null) {
      console.error(`failed to fetch mail with id: ${id}`);
      return undefined;
    }
    const { date, ...rest } = message;
    return {
      ...rest,
      id,
      date,
      timestamp: dayjs(date).unix(),
      actions: {
        open: `https://mail.google.com/mail/u/0/#inbox/${id}`,
      },
    };
  }));
  const result = _.values(_.groupBy(_.compact(messages), ({ subject }) => {
    return subject.slice(0, 20);
  })).map((entries) => {
    entries.forEach((e) => {
      e.timestamp = dayjs(e.date).unix();
    });
    const last = _.maxBy(entries, 'timestamp');
    const { id: lastId } = last;
    return {
      ...last,
      number: entries.length,
      others: _.reverse(_.sortBy(_.remove(entries, ({ id }) => id !== lastId), 'timestamp')),
    };
  });
  return _.reverse(_.sortBy(result, 'timestamp'));
};