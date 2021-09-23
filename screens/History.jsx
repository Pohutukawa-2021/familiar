import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

function History (props) {
  return (
    <View style={styles.container}>
      <Text>History calllog</Text>
      {/* {props.callLog.map()} */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default History
