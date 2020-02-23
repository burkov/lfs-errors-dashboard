import React from 'react';
import styles from './Dashboard.module.css';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';
import * as mailActions from '../actions/mailActions';
import { useGoogleAuth } from '../common/google-auth';
import Header from '../components/Header';
import LoadingBanner from '../components/LoadingBanner';
import LoginBanner from '../components/LoginBanner';
import ErrorsTable from './ErrorsTable';
import { listAllIds, useGoogleMail } from '../common/google-mail';
import { useAsyncEffect } from '../common/common';
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
    updateProgress,
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
  useAsyncEffect(async () => {
    updateProgress({
      message: 'Loading emails',
    });
    setTimeout(() => {

    }, 1000);
    // if (client !== undefined) {
    //   const ids = await listAllIds(client);
    //   console.log(ids);
    // }
  }, [ client ]);

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
  updateProgress: progressActions.updateProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

