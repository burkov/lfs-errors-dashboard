import React from 'react';
import styles from './LoginBanner.module.css';
import { Button } from 'antd';


const LoginBanner = ({onSignInClicked}) => {
  return (
    <div className={styles.container}>
      <p>To start using the app sign in to your <strong>@jetbrains.com</strong> account</p>
      <Button onClick={onSignInClicked}>Sign in</Button>
    </div>
  );
};

export default LoginBanner;