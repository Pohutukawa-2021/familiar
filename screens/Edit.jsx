import React, { useEffect } from 'react'
/* eslint-disable-next-line */
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  ScrollView
} from 'react-native'
import { styles } from './Add'
import { readData, saveData } from '../helpers/helperFunc'
function Edit (props) {
  let name, number, frequency, lastCall

  const [initalName, setInitalName] = React.useState('') // set initail name to match in local storage (in case the name gets edited)

  const [editForm, setEditForm] = React.useState({})

  useEffect(() => {
    name = props.route.params.contact.name
    number = props.route.params.contact.number
    frequency = props.route.params.contact.frequency
    lastCall = props.route.params.contact.lastCall
    setEditForm({ name, number, frequency, lastCall })
    setInitalName(name)
  }, [props.route.params.contact.name])

  function handleOnChangeEdit (name, value) {
    const newEditForm = {
      ...editForm,
      [name]: value
    }
    setEditForm(newEditForm)
  }

  async function handlePressEdit () {
    const { name, number, frequency, lastCall } = editForm
    const contact = { name, number, frequency, lastCall } // construct object, only used to send to ContactDetails component

    const data = await readData()

    const newData = data.map((value) => {
      if (value.name === initalName) {
        const newValue = { name, number, frequency, lastCall }
        return newValue
      } else return value
    })

    saveData(newData)
    props.navigation.navigate('Contact Details', { contact })
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.innerContainer}
        >
          <Text style={styles.h1}>Update</Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={editForm.name}
            placeholder="name"
            keyboardType="default"
            onChangeText={(value) => handleOnChangeEdit('name', value)}
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={editForm.number}
            placeholder="number"
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangeEdit('number', value)}
          />
          <Text style={styles.label}>Frequency</Text>
          <TextInput
            style={styles.input}
            value={editForm.frequency}
            placeholder="frequency"
            keyboardType="default"
            onChangeText={(value) => handleOnChangeEdit('frequency', value)}
          />
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handlePressEdit}>
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default Edit
