import React from 'react';
import styles from './SignInSignOutBlock.module.css';
import { Avatar } from 'antd';

const SignStatusBlock = ({ name, userPickLink, onSignOutClicked }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar size={48} icon='user'/>
      </div>
      <div className={styles.nameAndButtonContainer}>
        <div className={styles.userNameSpan}>{name}</div>
        <a href=''
           onClick={(e) => {
             e.preventDefault();
             onSignOutClicked();
           }}>
          Sign out
        </a>
      </div>
      {/*<div className={styles.buttonContainer}>*/}
      {/*  <Button onClick={() => isSigned ? onSignOut() : onSignIn()}*/}
      {/*          size={'small'}*/}
      {/*          block={true}*/}
      {/*  >*/}
      {/*    {isSigned ? 'Sign Out' : 'Sign In'}*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
};

export default SignStatusBlock;