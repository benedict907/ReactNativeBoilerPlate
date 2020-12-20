import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
