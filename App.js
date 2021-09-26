import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, View } from 'react-native'
import StackNavigation from './routes/Navigation'

export default function App () {
  return (
    <View style={styles.container}>
      <StackNavigation/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})
