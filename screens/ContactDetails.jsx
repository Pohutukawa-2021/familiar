import React from 'react'
import { StyleSheet, Button, View, Text, Alert, Pressable } from 'react-native'

function ContactDetails (props) {
  const { name, number, frequency, daysSinceLastCall } = props
  return (

    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.h1}>Dad</Text>
      </View>
      <View style={styles.innerContainer} >
        <Text style={styles.label}>Name: {name}</Text>
        <Text style={styles.label}>Number:{number}</Text>
        <Text style={styles.label}>Frequency: {frequency}</Text>
        <Text style={styles.label}>Days since last call:{daysSinceLastCall}</Text>
        <View style={styles.buttonView}>
          <Pressable style={styles.button}/*  onPress={handlePress} */>
            <Text style={styles.buttonText}>{`Call ${name}`}</Text>
          </Pressable>
        </View>
        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={() => props.navigation.navigate('Edit')}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  topContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: 'red',
    justifyContent: 'center'

  },
  innerContainer: {
    width: '80%',
    marginTop: 40,
    padding: 20
  },
  h1: {
    fontSize: 80,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center'
  },
  label: {
    width: '80%',
    fontSize: 20,
    marginBottom: 5
  },
  buttonView: {
    width: '100%',
    marginTop: 40,
    borderRadius: 35
  },
  button: {
    backgroundColor: '#5AF160',
    padding: 10,
    borderRadius: 35
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  }
})

export default ContactDetails
