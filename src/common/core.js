import localforage from 'localforage';
import {Set} from 'immutable';
import _ from 'lodash';

export const filterNewIds = async (ids) => {
  const knownKeys = Set(await localforage.keys());
  return _.filter(ids, (e) => !knownKeys.has(e));
};

const sanitizeSubject = (subject) => {
  return subject.replace(/^(jetprofile-prod RT error: )/, '');
};

export const saveMessages = async (messages) => {
  const promises = messages.map(({ id, payload: { headers } }) => {
    const { value: date } = _.find(headers, ({ name }) => name.toLowerCase() === 'date');
    const { value: subject } = _.find(headers, ({ name }) => name.toLowerCase() === 'subject');

    return localforage.setItem(id, { date, subject: sanitizeSubject(subject) });
  });
  await Promise.all(promises);
};

export const getAggregatedMessages = async (ids) => {
  const messages = await Promise.all(ids.map((id) => localforage.getItem(id)));
  const result = _.values(_.groupBy(messages, ({ subject }) => {
    return subject.slice(0, 8);
  })).map((entries) => {
    const last = _.maxBy(entries, 'date');
    return { ...last, number: entries.length };
  });
  return _.reverse(_.sortBy(result, 'date'));
};