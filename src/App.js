import React, { useReducer } from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { Col, Row } from 'antd';
import LfsLogo from './images/lfs_logo.png';
import styles from './App.module.css';
import _ from 'lodash';

import 'antd/dist/antd.css';
import SignStatusBlock from './SignStatusBlock';
import LoginBanner from './LoginBanner';
import { useGoogleAuth } from './google-auth';


const clientId = '797091362316-t4kt893ttu0ls2gdbjhbq7pn7g2r22tq.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/gmail.readonly';
// const loginHint = 'alexander.burkov@jetbrains.com';
const hostedDomain = 'jetbrains.com';

const actions = {
  init: 'INIT',
  initError: 'INIT_ERROR',
  signIn: 'SIGN_IN',
  signOut: 'SIGN_OUT',
};


const throwNotInitialized = () => {
  throw Error('gauth is not initialized yet');
};

const initialState = {
  initialized: false,
  isSignedIn: false,
  profile: {},
  tokens: {},
  error: undefined,
  signIn: throwNotInitialized,
  signOut: throwNotInitialized,
};

const reducer = (state, action) => {
  console.log(`${JSON.stringify(action)} => ${JSON.stringify(state)}`);
  const { signIn, signOut, error, profile, tokens } = action;
  switch (action.type) {
    case actions.init:
      return { ...state, initialized: true, signIn, signOut };
    case actions.initError:
      return { ...initialState, error };
    case actions.signIn:
      return { ...state, isSignedIn: true, profile, tokens };
    case action.signOut:
      return { ...state, isSignedIn: false, profile: {}, tokens: {} };
    default:
      return state;
  }
};

function App() {
  const [ authState, dispatch ] = useReducer(reducer, initialState, _.identity);
  useGoogleAuth({
    clientId,
    hostedDomain,
    scope,
    onSignedIn: ({ profile, tokens }) => dispatch({ type: actions.signIn, profile, tokens }),
    onSignedOut: () => dispatch({ type: actions.signOut }),
    onInitialized: ({ signIn, signOut }) => dispatch({ type: actions.init, signIn, signOut }),
    onInitializationError: (error) => dispatch({ type: actions.initError, error }),
  });
  const {
    initialized,
    error,
    signIn,
    signOut,
    profile,
    tokens,
    isSignedIn,
  } = authState;

  console.log(`useGoogleAuth: {
    initialize: ${initialized},
    isSignedIn: ${isSignedIn},
    signIn: ${signIn},
    signOut: ${signOut},
    profile: ${profile},
    tokens: ${tokens},
  }`);

  const { name, imageUrl } = profile;

  return (
    <>
      <Helmet>
        <title>LFS errors dashboard</title>
      </Helmet>
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
      <main className={styles.mainContainer}>
        {!isSignedIn ?
          <LoginBanner onSignInClicked={signIn} disabled={!initialized}/> :
          <div>The app</div>
        }
      </main>
    </>
  );
}

export default App;
