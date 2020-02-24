import React from 'react';
import {Button, Table, Tooltip} from 'antd';
import dayjs from 'dayjs';
import styles from './ErrorsTable.module.css'
import _ from 'lodash';

const subjectColumn = {
  title: 'Subject',
  dataIndex: 'subject',
  key: 'subject',
  render: (subject, { actions: { open } }) => {
    return (
      <>
        <a href={open} target='_blank' rel="noopener noreferrer">
          <Button icon='link' type='link'/>
        </a>
        &nbsp;
        <span>{subject.slice(0, 160)}</span>
      </>
    );
  },
};

const dateColumn = ({ title }) => ({
  title,
  dataIndex: 'date',
  key: 'date',
  render: (date) => {
    const d = dayjs(date);
    return (
      <Tooltip title={d.format()} placement='bottom'>
        {d.fromNow()}
      </Tooltip>
    );
  },
});

const mainTableColumns = [
  dateColumn({ title: 'Last' }),
  {
    title: '# of similar',
    dataIndex: 'number',
    key: 'number',
  },
  subjectColumn,
];


const expandedRowRender = ({ others }) => {
  if(_.isEmpty(others)) return false;
  console.log(others);
  const columns = [
    dateColumn({ title: 'Date' }),
    subjectColumn,
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
      hideOnSinglePage: true
    }}
  />;
};

const ErrorsTable = ({ messages }) => {
  return (
    <>
      <Table
        rowKey='id'
        expandRowByClick={true}
        dataSource={messages}
        columns={mainTableColumns}
        size='small'
        pagination={false}
        expandedRowRender={expandedRowRender}
      />
    </>
  );
};


export default ErrorsTable;