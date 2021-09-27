import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export function renderWithNavigation(ui, type, routeParams = {}) {
  const content = (
    <NavigationContainer>
      {type.toLowerCase() === 'stack' && (
        <Stack.Navigator initialRouteName="test">
          <Stack.Screen name="test" initialParams={routeParams}>
            {(props) => ({ ...ui, props: { ...props, ...ui.props } })}
          </Stack.Screen>
        </Stack.Navigator>
      )}
      {type.toLowerCase() === 'tab' && (
        <Tab.Navigator initialRouteName="test">
          <Tab.Screen name="test" initialParams={routeParams}>
            {(props) => ({ ...ui, props: { ...props, ...ui.props } })}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  )
  return render(content)
}
