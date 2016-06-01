import React from 'react';
import {View, PropTypes, StyleSheet} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import AppRouter from './AppRouter';
import Spinner from 'react-native-gifted-spinner';
import * as auth0 from '../services/auth0';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

const AppView = React.createClass({

  /* props set in container are accessed by this.props.PROPNAME */

  /* propTypes throws a warning if none of the expected props are met
    only used in development mode. Only does checking for expected values, not setting */
  propTypes: {
    isReady: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  /* componentDidMount is a lifecycle method that occurs prior to view loading */
  componentDidMount() {
    /* checks to see if a snapshot (stored state) exists (called asynchronously)*/
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        /* same as const dispatch = this.props.dispatch */
        const {dispatch} = this.props;

        /* if previous snapshot exists */
        if (snapshot) {
          /* dispatch reset session event */
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          /* dispatch a new session event */
          dispatch(SessionStateActions.initializeSessionState());
        }

        /* store is listening to the current snapshot state */
        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  },

  /* Another lifecycle method prior to render involving props */
  componentWillReceiveProps({isReady, isLoggedIn}) {
    /* if user is not logged in, show login screen */
    if (!this.props.isReady) {
      if (isReady && !isLoggedIn) {
        auth0.showLogin();
      }
    }
  },

 /* your view display */
  render() {
    /* if not ready show loading */
    if (!this.props.isReady) {
      return (
        <View style={styles.centered}>
          <Spinner />
        </View>
      );
    }

    /* Otherwise the user is ready and logged in, show we can show them actual content*/

    return (
        /* Starts with external navigation template and passes in AppRouter*/ 
      <View style={{flex: 1}}>
        <NavigationViewContainer router={AppRouter} />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AppView;
