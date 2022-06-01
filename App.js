import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/home';
import Page2 from './src/pages/page2';
import Page3 from './src/pages/page3';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Stack berguna untuk routing aplikasi
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => {
            return null;
          ;},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="home" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Page2"
          component={Page2}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="heart" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Page3"
          component={Page3}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="user" color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
