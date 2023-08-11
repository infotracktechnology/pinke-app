
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './HomeScreen'; 
import AddContact from './AddContact';


const Tab = createBottomTabNavigator();

function NavigationContainerComponent() {
  return (
    <NavigationContainer>
      <Tab.Navigator  
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Add Contact') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Contact" component={AddContact} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavigationContainerComponent;
