import React from 'react';
import styles from './Header.module.css';
import { Col, Row } from 'antd';
import LfsLogo from '../images/lfs_logo.png';
import SignStatusBlock from './SignStatusBlock';


const Header = ({ name, imageUrl, isSignedIn, signOut }) => {
  return (
    <header className={styles.header}>
      <Row>
        <Col span={6} offset={2}>
          <div className={styles.logoContainer}>
            <img src={LfsLogo} width='48px' alt='Logo' className={styles.logo}/>
            <h1 className={styles.logoTitle}>LFS Errors Dashboard</h1>
          </div>
        </Col>
        <Col offset={10} span={4}>
          {isSignedIn && <SignStatusBlock name={name}
                                          userPickLink={imageUrl}
                                          onSignOutClicked={signOut}
          />}
        </Col>
      </Row>
    </header>
  );
};

export default Header;