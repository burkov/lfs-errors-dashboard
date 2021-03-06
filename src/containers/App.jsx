import React from 'react';

import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import Dashboard from './Dashboard';
import {composeWithDevTools} from 'redux-devtools-extension';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const store = createStore(rootReducer, composeWithDevTools());

dayjs.extend(relativeTime);

function App() {
  return (
    <>
      <Provider store={store}>
        <Dashboard/>
      </Provider>
    </>
  );
}

export default App;
