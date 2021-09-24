import React from 'react'
import { StyleSheet, Button, View, Text, Alert } from 'react-native'
import { saveData, readData } from './helperFunc'
import moment from 'moment'

function ContactDetails (props) {
  const { name, number, frequency, lastCall } = props.route.params.contact

  async function handlePress () {
    const data = await readData()
    const newData = data.map(value => {
      if (value.name === name) {
        const newValue = { ...value, lastCall: moment().format('YYYY/MM/DD') }
        return newValue
      } else {
        return value
      }
    })
    saveData(newData)
    console.log(await readData())
  }

  return (
    <>
      <View style={styles.container}>
        <Text>Name: {name}</Text>
        <Text>Number: {number}</Text>
        <Text>Frequency: {frequency}</Text>
        <Text>Days since last call: {lastCall}</Text>
      </View>
      <View>
        <Button title={`Call ${name}`} onPress={handlePress}/>
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
