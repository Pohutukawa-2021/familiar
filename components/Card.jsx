import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Card (props) {
  return (
    <View style={styles.container}>
      <Text>
        {props.name}
      </Text>
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

export default Card
