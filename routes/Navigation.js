import * as React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Add from '../screens/Add'
import Edit from '../screens/Edit'
import ContactDetails from '../screens/ContactDetails'

const Tab = createBottomTabNavigator()

function Navigation () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Add" component={Add} />
        <Tab.Screen name="ContactDetails" component={ContactDetails} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
