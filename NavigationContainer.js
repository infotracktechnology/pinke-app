
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './HomeScreen'; 
import AddContact from './AddContact';
import EditContact from './EditContact';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function NavigationContainerComponent() {
  return (
    <NavigationContainer>
    <Stack.Navigator  screenOptions={{
        headerStyle: {
          backgroundColor: '#dd127b',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }} initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Pinke Contacts'}} />
      <Stack.Screen name="Add Contact" component={AddContact}  options={{title: 'Pinke Contacts'}}/>
      <Stack.Screen name="Edit Contact"  component={EditContact}   options={{title: 'Pinke Contacts'}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationContainerComponent;
