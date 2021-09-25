import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, View, TextInput, Button, Text, Pressable } from 'react-native'
import { styles } from './Add'
function Edit (props) {
  const { name, number, frequency, lastCall } = props.route.params.contact

  const [editForm, setEditForm] = React.useState({
    name,
    number,
    frequency,
    lastCall
  })

  function handleOnChangeEdit (name, value) {
    console.log(name, value)
    const newEditForm = {
      ...editForm,
      [name]: value
    }
    setEditForm(newEditForm)
  }

  function handlePressEdit () {
    // send editForm object to localstorage
    // redirect to ContactDetails component
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer} >
          <Text style={styles.h1}>Edit</Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={editForm.name}
            placeholder='name'
            keyboardType="default"
            onChangeText={(value) => handleOnChangeEdit('name', value)}
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={editForm.number}
            placeholder='number'
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangeEdit('number', value)}
          />
          <Text style={styles.label}>Frequency</Text>
          <TextInput
            style={styles.input}
            value={editForm.frequency}
            placeholder='frequency'
            keyboardType="default"
            onChangeText={(value) => handleOnChangeEdit('frequency', value)}
          />
          <Text style={styles.label}>Days Since Last Call</Text>
          <TextInput
            style={styles.input}
            value={editForm.lastCall}
            placeholder='days since last call'
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangeEdit('daysSinceLastCall', value)}
          />
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handlePressEdit}>
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  )
}

export default Edit
