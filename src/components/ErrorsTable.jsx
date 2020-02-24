import React, { useMemo, useState } from 'react';
import { Button, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import styles from './ErrorsTable.module.css';
import _ from 'lodash';
import classNames from 'classnames';

const subjectColumn = (readIds) => ({
  title: 'Subject',
  dataIndex: 'subject',
  key: 'subject',
  render: (subject, { actions: { open }, id }) => {
    return (
      <>
        <a href={open} target='_blank' rel="noopener noreferrer">
          <Button icon='link' type='link'/>
        </a>
        &nbsp;
        <span className={classNames({ [styles.unread]: readIds && !readIds.has(id) })}>
          {subject.slice(0, 160)}
        </span>
      </>
    );
  },
});

const dateColumn = ({ title, readIds }) => ({
  title,
  dataIndex: 'date',
  key: 'date',
  render: (date, { id }) => {
    const d = dayjs(date);
    return (
      <Tooltip title={d.format()} placement='bottom'>
        <span className={classNames({ [styles.unread]: readIds && !readIds.has(id) })}>
          {d.fromNow()}
        </span>
      </Tooltip>
    );
  },
});

const expandedRowRender = ({ others }) => {
  if (_.isEmpty(others)) return false;
  const columns = [
    dateColumn({ title: 'Date'}),
    subjectColumn(),
  ];
  return <Table
    showHeader={false}
    rowKey='id'
    dataSource={others}
    columns={columns}
    size='small'
    pagination={{
      pageSize: 10,
      position: 'bottom',
      hideOnSinglePage: true,
    }}
  />;
};

const ErrorsTable = ({ messages, onMarkReadClicked, onMarkUnreadClicked, readIds }) => {
  const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
  const rowSelection = {
    onChange: setSelectedRowKeys,
  };
  const mainTableColumns = useMemo(() => [
    dateColumn({ title: 'Last', readIds }),
    {
      title: '# of similar',
      dataIndex: 'number',
      key: 'number',
      render: (number, { id }) => {
        return (
          <span className={classNames({ [styles.unread]: !readIds.has(id) })}>
          {number}
        </span>
        );
      },
    },
    subjectColumn(readIds),
  ], [ readIds ]);
  return (
    <>
      <div className={styles.buttonsContainer}>
        <Button icon='check' onClick={() => onMarkReadClicked(selectedRowKeys)}>Mark read</Button>
        &nbsp;
        <Button icon='close' onClick={() => onMarkUnreadClicked(selectedRowKeys)}>Mark un-read</Button>
        <div className={styles.selectionCount}>
          {selectedRowKeys.length} threads selected
        </div>
      </div>
      <Table
        rowKey='id'
        dataSource={messages}
        columns={mainTableColumns}
        size='small'
        pagination={false}
        expandedRowRender={expandedRowRender}
        rowSelection={rowSelection}
      />
    </>
  );
};


export default ErrorsTable;