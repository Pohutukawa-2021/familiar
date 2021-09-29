import * as React from 'react'
/* eslint-disable-next-line */
import { Image } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import Add from '../screens/Add'
import Edit from '../screens/Edit'
import History from '../screens/History'
import ContactDetails from '../screens/ContactDetails'
import Settings from '../screens/Settings'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function tabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: '#22CAFF',
        tabBarInactiveBackgroundColor: '#22CAFF',
        tabBarStyle: [{ display: 'flex' }, null]
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require('../assets/home.png')}
              />
            )
          }
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require('../assets/history.png')}
              />
            )
          }
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require('../assets/settings.png')}
              />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#22CAFF',
    text: 'white',
    primary: 'white'
  }
}

export function stackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabNavigation"
        component={tabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Contact Details" component={ContactDetails} />
    </Stack.Navigator>
  )
}

function StackNavigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="tabNavigation"
          component={tabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Contact Details" component={ContactDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export { tabNavigation }
export default StackNavigation
