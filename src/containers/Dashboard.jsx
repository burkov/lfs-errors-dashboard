import React, {useRef, useState} from 'react';
import styles from './Dashboard.module.css';
import {connect} from 'react-redux';
import * as authActions from '../actions/authActions';
import * as mailActions from '../actions/mailActions';
import {useGoogleAuth} from '../common/google-auth';
import Header from '../components/Header';
import LoadingBanner from '../components/LoadingBanner';
import LoginBanner from '../components/LoginBanner';
import ErrorsTable from '../components/ErrorsTable';
import {listAllIds, useGoogleMail} from '../common/google-mail';
import {useAsyncEffect} from '../common/common';
import * as progressActions from '../actions/progressActions';

const clientId = '797091362316-t4kt893ttu0ls2gdbjhbq7pn7g2r22tq.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/gmail.readonly';
const apiKey = 'AIzaSyD-QsOK6xDB1oECO1uEX-PCzi-FeauYGSo';
const hostedDomain = 'jetbrains.com';

const Dashboard = (
  {
    initialized,
    auth: { isSignedIn, signIn, signOut, profile: { name, imageUrl } },
    mail: { client },
    progress: { current, max, message },
    onAuthInit,
    onAuthInitError,
    onSignedIn,
    onSignedOut,
    onMailInit,
    onMailInitError,
    activateProgress,
    incrementProgress,
    deactivateProgress,
  },
) => {
  useGoogleAuth({
    clientId,
    hostedDomain,
    scope,
    onSignedIn,
    onSignedOut,
    onInitialized: onAuthInit,
    onInitializationError: onAuthInitError,
  });
  useGoogleMail({
    apiKey,
    onInitialized: onMailInit,
    onInitializationError: onMailInitError,
  });
  // const count = useRef(0);
  useAsyncEffect(async () => {
    deactivateProgress();
    if (client !== undefined && isSignedIn) {
      // setInterval(() => {
      //   count.current = count.current + 1;
      //   updateProgress({
      //     active: count.current < 100,
      //     max: 100,
      //     current: count.current,
      //     message: `Loading emails...`,
      //   });
      // }, 100);
      const ids = await listAllIds(client);
      console.log(ids);
    }
  }, [ client, isSignedIn ]);

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
          <LoadingBanner current={current} max={max} message={message}/> :
          (!isSignedIn ?
              <LoginBanner onSignInClicked={signIn} disabled={!initialized}/> :
              <ErrorsTable/>
          )}
      </main>
    </>
  );
};

const mapStateToProps = (
  {
    auth: { initialized: authInitialized, isSignedIn, signIn, signOut, profile },
    mail: { initialized: mailInitialized, client },
    progress: { active, current, max, message },
  },
) => {
  const initialized = authInitialized && mailInitialized && !active;
  return {
    initialized,
    auth: { isSignedIn, signIn, signOut, profile },
    mail: { client },
    progress: { active, current, max, message },
  };
};

const mapDispatchToProps = {
  onAuthInit: authActions.init,
  onAuthInitError: authActions.initError,
  onSignedIn: authActions.signIn,
  onSignedOut: authActions.signOut,
  onMailInit: mailActions.init,
  onMailInitError: mailActions.initError,
  activateProgress: progressActions.activateProgress,
  incrementProgress: progressActions.incrementProgress,
  deactivateProgress: progressActions.deactivateProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

