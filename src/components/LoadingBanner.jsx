import React from 'react';
import { Spin } from 'antd';
import styles from './LoadingBanner.module.css';


const LoadingBanner = ({ current, max, message }) => {
  return (
    <div className={styles.container}>
      <Spin size='large'/>
      <p>{message}</p>
    </div>
  );
};

export default LoadingBanner;