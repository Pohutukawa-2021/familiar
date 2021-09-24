import React from 'react'
import { StyleSheet, Button, View, Text, Alert } from 'react-native'

function ContactDetails (props) {
  const { name, number, frequency, daysSinceLastCall } = props
  return (

    <View style={styles.container}>
      <View style={styles.innerContainer} >
        <Text style={styles.label}>Name: {name}</Text>
        <Text style={styles.label}>Number:{number}</Text>
        <Text style={styles.label}>Frequency: {frequency}</Text>
        <Text style={styles.label}>Days since last call:{daysSinceLastCall}</Text>
        <View>
          <Button title={`Call ${name}`}/>
          <Button title='Edit' {...props} onPress={() => props.navigation.navigate('Edit')}/>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    width: '80%',
    marginTop: 40,
    margin: 10
  },
  h1: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30
  },
  label: {
    width: '80%',
    fontSize: 25
  },
  button: {
    width: '100%',
    marginTop: 40
  }
})

export default ContactDetails
