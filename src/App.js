import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet/es/Helmet';
import { Col, Row } from 'antd';
import LfsLogo from './images/lfs_logo.png';
import styles from './App.module.css';


import 'antd/dist/antd.css';
import SignStatusBlock from './SignStatusBlock';
import LoginBanner from './LoginBanner';
import { initGoogleAuthLib } from './google-auth';


const clientId = '797091362316-t4kt893ttu0ls2gdbjhbq7pn7g2r22tq.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/gmail.readonly';
// const loginHint = 'alexander.burkov@jetbrains.com';
const hostedDomain = 'jetbrains.com';


function App() {
  // const [ debugInfo, setDebugInfo ] = useState({});
  // const silent = () => {
  //   const auth = window.gapi.auth2.getAuthInstance();
  //   const user = auth.currentUser.get();
  //   const authResponse = user.getAuthResponse();
  //
  //   setAndLog(authResponse);
  // };
  //
  // const setAndLog = (v) => {
  //   // console.log(v);
  //   // setDebugInfo(v);
  // };
  //
  //
  // const onSuccess = (res) => {
  //   // console.log(`called: ${res}`);
  // };

  // const [ isSignedIn, setSignedIn ] = useState(false);

  // const options = {
  //   onSuccess,
  //   onFailure: setAndLog,
  //   onLogoutFailure: setAndLog,
  //   onRequest: _.noop,
  //   clientId,
  //   fetchBasicProfile: true,
  //   hostedDomain,
  //   scope: scopes.readonly,
  //   cookiePolicy: 'single_host_origin',
  //   jsSrc: 'https://apis.google.com/js/api.js',
  // };

  // const { signIn, loaded: signInScriptLoaded } = useGoogleLogin(options);
  // const { signOut, loaded: signOutScriptLoaded } = useGoogleLogout(options);


  // useEffect(() => {
  //   console.log(`signInScriptLoaded: ${signInScriptLoaded}`);
  //   if (signInScriptLoaded) {
  //     const auth = window.gapi.auth2.getAuthInstance();
  //     auth.isSignedIn.listen(setSignedIn);
  //   }
  // }, [ signInScriptLoaded ]);

  // useEffect(() => {
  //   console.log(`state: ${isSignedIn ? 'SIGNED IN' : 'SIGNED OUT'}`);
  //   if (isSignedIn) {
  //     const auth = window.gapi.auth2.getAuthInstance();
  //     const user = auth.currentUser.get();
  //     const authResponse = user.getAuthResponse();
  //     console.log(`fetching user info: ${JSON.stringify(user)}`);
  //   } else {
  //   }
  // }, [ isSignedIn ]);

  const name = 'alexander.burkov@jetbrains.com';
  const [ isSigned, setSigned ] = useState(false);

  useEffect(() => {
    initGoogleAuthLib({
      clientId,
      hostedDomain,
      scope,
      onInit: (gapi) => {
        console.log(gapi.currentUser.get().getBasicProfile());
      },
    });
  }, []);

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
            {isSigned && <SignStatusBlock name={name}
                                          onSignOutClicked={() => setSigned(false)}
            />}
          </Col>
        </Row>
      </header>
      <main className={styles.mainContainer}>
        {!isSigned ?
          <LoginBanner onSignInClicked={() => setSigned(true)}/> :
          <div>The app</div>
        }
      </main>
    </>
  );
}

export default App;
