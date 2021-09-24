import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        familiar
      </Text>
      <Image style={styles.image} source={require('../assets/animated-circle.gif')} />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6666',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  label: {
    fontSize: 40,
    marginTop: 210,
    color: 'white'
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 30
  }
})

export default Loading
