import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View } from 'react-native'

function Loading () {
  return (
    <View style={styles.container}>
      <Text>
            Familiar
      </Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

export default Loading
