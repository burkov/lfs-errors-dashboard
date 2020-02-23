import React from 'react';
import { Spin } from 'antd';
import styles from './LoadingBanner.module.css';


const LoadingBanner = () => {
  return (
    <div className={styles.container}>
      <Spin size='large'/>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingBanner;