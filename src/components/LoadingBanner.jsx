import React from 'react';
import {Alert, Progress, Spin} from 'antd';
import styles from './LoadingBanner.module.css';

const LoadingBanner = ({ current, max, message, errors }) => {
  const havePercent = current !== undefined && max !== undefined;
  const percent = havePercent && (
    parseInt(current) * 100 / parseInt(max)
  );
  return (
    <div className={styles.container}>
      <Spin size='large'/>
      <p className={styles.message}>{message}</p>
      {havePercent && <Progress percent={percent} status='active'/>}
      {errors.map((error) => <Alert message={error} type='error' className={styles.errorAlert}/>)}
    </div>
  );
};

export default LoadingBanner;