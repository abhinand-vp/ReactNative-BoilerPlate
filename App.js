/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Fragment } from 'react';
import AppNavigator from './AppNavigator';
import SplashScreen from "react-native-splash-screen";
import { useEffect } from 'react';

const App = () => {
  console.log("app navigater");

  useEffect(() => {
    SplashScreen.hide(); 
  }, []);

  return (
    <Fragment>
      <AppNavigator />
    </Fragment>
  )
};

export default App;
