import * as React from 'react'
/* eslint-disable-next-line */
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Add from '../screens/Add'
import Edit from '../screens/Edit'
import History from '../screens/History'
// import Loading from '../screens/Loading'
import ContactDetails from '../screens/ContactDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

// const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function tabNavigation () {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen name="Add" component={Add} options={{ headerShown: false }} /> */}
      <Tab.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

function StackNavigation () {
  return (
    <NavigationContainer>
      <Stack.Navigator >
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

// function Navigation () {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen
//           name="Home"
//           component={stackNavigation} /* options={{ title: '' }} */
//         />
//         {/* <Drawer.Screen name="Add" component={Add} />
//         <Drawer.Screen name="Edit" component={Edit} />
//         <Drawer.Screen name="History" component={History} />
//         <Drawer.Screen name="Contact Details" component={ContactDetails} /> */}
//         <Drawer.Screen name="Loading" component={Loading} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }

export default StackNavigation
// export default Navigation
