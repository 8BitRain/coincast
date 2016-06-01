import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

import React from 'react';
import {AppRegistry} from 'react-native';

const Kindling = React.createClass({

  render() {
    return (
      /*passing store to Provider so that internal components
      can conveiently do dispatches */
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
});

AppRegistry.registerComponent('Kindling', () => Kindling);
