import React from 'react';
import styles from './Dashboard.module.css';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';
import { useGoogleAuth } from '../common/google-auth';
import Header from '../components/Header';
import LoadingBanner from '../components/LoadingBanner';
import LoginBanner from '../components/LoginBanner';

const clientId = '797091362316-t4kt893ttu0ls2gdbjhbq7pn7g2r22tq.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/gmail.readonly';
const hostedDomain = 'jetbrains.com';

const Dashboard = (
  {
    initialized,
    isSignedIn,
    signIn,
    signOut,
    profile: { name, imageUrl },
    tokens,
    onInit,
    onInitError,
    onSignedIn,
    onSignedOut,
  },
) => {
  useGoogleAuth({
    clientId,
    hostedDomain,
    scope,
    onSignedIn,
    onSignedOut,
    onInitialized: onInit,
    onInitializationError: onInitError,
  });

  return (
    <>
      <Header
        name={name}
        imageUrl={imageUrl}
        isSignedIn={isSignedIn}
        signOut={signOut}
      />
      <main className={styles.mainContainer}>
        {!initialized ?
          <LoadingBanner/> : (!isSignedIn ?
              <LoginBanner onSignInClicked={signIn} disabled={!initialized}/> :
              <div>The app</div>
          )}
      </main>
    </>
  );
};

const mapStateToProps = ({ auth: { initialized, isSignedIn, signIn, signOut, profile, tokens } }) => ({
  initialized, isSignedIn, signIn, signOut, profile, tokens,
});

const mapDispatchToProps = {
  onInit: authActions.init,
  onInitError: authActions.initError,
  onSignedIn: authActions.signIn,
  onSignedOut: authActions.signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

