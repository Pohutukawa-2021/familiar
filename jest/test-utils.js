import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export function renderWithNavigation(ui, type) {
  const content = (
    <NavigationContainer>
      {type.toLowerCase() === 'stack' && (
        <Stack.Navigator initialRouteName="test">
          <Stack.Screen name="test">{(props) => ui}</Stack.Screen>
        </Stack.Navigator>
      )}
      {type.toLowerCase() === 'tab' && (
        <Tab.Navigator initialRouteName="test">
          <Tab.Screen name="test">{(props) => ui}</Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  )
  return render(content)
}
