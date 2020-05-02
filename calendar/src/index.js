/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Navigator from 'src/navigator';
import {store, persistor} from 'src/state';

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
