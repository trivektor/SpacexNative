/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Launch, Home, Rocket} from './components';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
});

const Stack = createStackNavigator();

console.disableYellowBox = true;

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SpaceX Archives"
            component={Home} />
          <Stack.Screen
            name="Launch"
            component={Launch}
            options={({route}) => ({title: route.params.launchTitle})} />
          <Stack.Screen
            name="Rocket"
            component={Rocket}
            options={({route}) => ({title: route.params.rocketName})} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
