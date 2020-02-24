import React from 'react';
import styles from './SignInSignOutBlock.module.css';
import {Avatar} from 'antd';

const SignStatusBlock = ({ disabled, name, userPickLink, onSignOutClicked }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar size={48} icon='user' src={userPickLink}/>
      </div>
      <div className={styles.nameAndButtonContainer}>
        <div className={styles.userNameSpan}>{name}</div>
        {disabled ? <span>Sign out</span> :
          <a href=''
             onClick={(e) => {
               e.preventDefault();
               onSignOutClicked();
             }}>
            Sign out
          </a>
        }
      </div>
    </div>
  );
};

export default SignStatusBlock;