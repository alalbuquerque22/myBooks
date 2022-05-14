import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/Signin';
import Home from '../pages/Home';
import Book from '../pages/Book';
const {Navigator, Screen} = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Screen name="Login" component={Login} />
        <Screen name="Home" component={Home} />
        <Screen name="Book" component={Book} />
      </Navigator>
    </NavigationContainer>
  );
};
export default Routes;
