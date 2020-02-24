import React, {useState} from 'react';
import styles from './Dashboard.module.css';
import {connect} from 'react-redux';
import * as authActions from '../actions/authActions';
import * as mailActions from '../actions/mailActions';
import {useGoogleAuth} from '../common/google-auth';
import Header from '../components/Header';
import LoadingBanner from '../components/LoadingBanner';
import LoginBanner from '../components/LoginBanner';
import ErrorsTable from '../components/ErrorsTable';
import {getMessages, listAllIds, useGoogleMail} from '../common/google-mail';
import {useAsyncEffect} from '../common/common';
import * as progressActions from '../actions/progressActions';
import {filterNewIds, getAggregatedMessages, saveMessages} from '../common/core';
import _ from 'lodash';
import {version} from '../config';

const clientId = '797091362316-t4kt893ttu0ls2gdbjhbq7pn7g2r22tq.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/gmail.readonly';
const apiKey = 'AIzaSyD-QsOK6xDB1oECO1uEX-PCzi-FeauYGSo';
const hostedDomain = 'jetbrains.com';

const Dashboard = (
  {
    initialized,
    auth: { isSignedIn, signIn, signOut, profile: { name, imageUrl }, error: authError },
    mail: { client, error: mailError },
    progress: { current, max, message },
    onAuthInit,
    onAuthInitError,
    onSignedIn,
    onSignedOut,
    onMailInit,
    onMailInitError,
    activateProgress,
    deactivateProgress,
  },
) => {
  const [ messages, setMessages ] = useState([]);
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
    if (client !== undefined && isSignedIn) {
      activateProgress({ message: `Loading emails...` });
      const ids = await listAllIds(client);
      activateProgress({ message: `Found ${ids.length} emails in LFS mail list` });
      const newIds = await filterNewIds(ids);
      activateProgress({ message: `Fetching ${newIds.length} new emails` });
      const result = await getMessages(client, newIds);
      await saveMessages(result);
      console.log(`Done saving`);
      activateProgress({ message: `Processing messages` });
      setMessages(await getAggregatedMessages(ids));
      console.log(`Done processing`);
      deactivateProgress();
    }
  }, [ client, isSignedIn ]);

  return (
    <>
      <Header
        name={name}
        imageUrl={imageUrl}
        isSignedIn={isSignedIn}
        signOut={signOut}
        version={version}
      />
      <main className={styles.mainContainer}>
        {!initialized ?
          <LoadingBanner current={current}
                         max={max}
                         message={message}
                         errors={_.compact([ authError, mailError ])}
          /> :
          (!isSignedIn ?
              <LoginBanner onSignInClicked={signIn} disabled={!initialized}/> :
              <ErrorsTable messages={messages}/>
          )}
      </main>
    </>
  );
};

const mapStateToProps = (
  {
    auth: { initialized: authInitialized, isSignedIn, signIn, signOut, profile, error: authError },
    mail: { initialized: mailInitialized, client, error: mailError },
    progress: { active, current, max, message },
  },
) => {
  const initialized = authInitialized
    && mailInitialized
    && !active
    && _.isNil(authError)
    && _.isNil(mailError);
  return {
    initialized,
    auth: { isSignedIn, signIn, signOut, profile, error: authError },
    mail: { client, error: mailError },
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

