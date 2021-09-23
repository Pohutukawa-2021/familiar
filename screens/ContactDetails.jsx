import React from 'react'
import { StyleSheet, Button, View, Text, Alert } from 'react-native'

function ContactDetails (props) {
  const { name, number, frequency, daysSinceLastCall } = props
  return (
    <>
      <View style={styles.container}>
        <Text>Name: {name}</Text>
        <Text>Number: {number}</Text>
        <Text>Frequency: {frequency}</Text>
        <Text>Days since last call: {daysSinceLastCall}</Text>
      </View>
      <View>
        <Button title={`Call ${name}`}/>
        <Button title='Edit' {...props} onPress={() => props.navigation.navigate('Edit')}/>
      </View>
    </>

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

export default ContactDetails
