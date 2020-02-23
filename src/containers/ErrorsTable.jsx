import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../common/common';
import { listAllIds } from '../common/google-mail';
import * as progressActions from '../actions/progressActions';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const ErrorsTable = ({ client, updateProgress }) => {


  return (
    <>
      <Table dataSource={dataSource} columns={columns} size='small'/>
    </>
  );
};

const mapStateToProps = ({ mail: { client } }) => ({ client });
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorsTable);