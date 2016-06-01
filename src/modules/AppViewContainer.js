import {connect} from 'react-redux';
import AppView from './AppView';

/*

  Here where are using redux connect which connects a React component to a Redux store.

  It looks as follows:
  connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]))(View)

  Where (View) is the component  and connect(params) are the store

  but only using the args [mapStateToProps] and defaulting on the other params,
  giving us a default dispatcher from Provider

  mapStateToProps looks as follows:
    function mapStateToProps(state) {
      return { todos: state.todos }
    }

*/

export default connect(

  /* arrow function means same as
  func(state){

    var hash = {};
    hash.isReady = state.getIn(['session', 'isReady']);
    hash.isLoggedIn = state.getIn(['auth', 'isLoggedIn'])

    return hash;

  }

    where isReady and isLoggedIn are properties(aka props) used by AppView
    And state.getIn refers to an immutable.js library function

    So 'isReady: state.getIn(['session', 'isReady'])'
    goes into a tree that looks like the following:

    Map {
      state: Map{
        session: Map {
          isReady: bool
        }
      }
    }


    And returns the bool value associated with the key isReady

       * Note: Map is referring to a dictionary/hashtable/hashmap data structure

   */


  state => ({
    isReady: state.getIn(['session', 'isReady']),
    isLoggedIn: state.getIn(['auth', 'isLoggedIn'])
  })
)(AppView);
