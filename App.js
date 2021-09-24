import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navigation from './routes/Navigation'
import Home from './screens/Home'

export default function App () {
  // This comment is for the inital commit of the dev branch
  return (
    <View style={styles.container}>
      <Navigation/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center'
    justifyContent: 'center'
  }
})
