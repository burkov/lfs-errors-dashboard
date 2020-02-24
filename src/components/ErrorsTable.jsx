import React from 'react';
import {Button, Table, Tooltip} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const columns = [
  {
    title: 'Last',
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
  },
  {
    title: '# of similar',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    render: (subject, {actions: {open}}) => {
      return (
        <>
          <a href={open} target='_blank'>
            <Button icon='link' type='link'></Button>
          </a>
          &nbsp;
          <span>{subject.slice(0, 160)}</span>
        </>
      );
    },
  },
];

const expandedRowRender = (data) => {
  console.log(data);
};

const ErrorsTable = ({ messages }) => {
  return (
    <>
      <Table
        rowKey='subject'
        dataSource={messages}
        columns={columns}
        size='small'
        pagination={false}
        // expandedRowRender={expandedRowRender}
      />
    </>
  );
};


export default ErrorsTable;