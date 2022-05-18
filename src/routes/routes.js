import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import Login from '../pages/Signin';
import Home from '../pages/Home';
import Book from '../pages/Book';
import Favorites from '../pages/Favorites';
// const {Navigator, Screen} = createStackNavigator();
const {Navigator, Screen} = createSharedElementStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Screen name="Login" component={Login} />
        <Screen name="Home" component={Home} />
        <Screen name="Book" component={Book} />
        <Screen name="Favorites" component={Favorites} />
      </Navigator>
    </NavigationContainer>
  );
};
export default Routes;
