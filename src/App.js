import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './redux/store';
import Router from './router';
import {Immersive} from 'react-native-immersive';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Router />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
