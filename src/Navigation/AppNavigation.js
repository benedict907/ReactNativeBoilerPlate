import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppNavigation = ({
  searchScreenText: {searchText},
  editProfileScreenText: {editProfileText},
  resetNotchColors,
}) => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
