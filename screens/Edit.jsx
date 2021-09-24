import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, Pressable } from 'react-native'
import { styles } from './Add'
function Edit (props) {
  const { name, number, frequency, daysSinceLastCall } = props

  const [editForm, setEditForm] = React.useState({
    name,
    number,
    frequency,
    daysSinceLastCall
  })

  function handleOnChangeEdit (name, value) {
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
            value={name}
            placeholder='name'
            keyboardType="default"
            onChange={(value) => handleOnChangeEdit('name', value)}
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={number}
            placeholder='number'
            keyboardType="numeric"
            onChange={(value) => handleOnChangeEdit('number', value)}
          />
          <Text style={styles.label}>Frequency</Text>
          <TextInput
            style={styles.input}
            value={frequency}
            placeholder='frequency'
            keyboardType="default"
            onChange={(value) => handleOnChangeEdit('frequency', value)}
          />
          <Text style={styles.label}>Days Since Last Call</Text>
          <TextInput
            style={styles.input}
            value={daysSinceLastCall}
            placeholder='days since last call'
            keyboardType="numeric"
            onChange={(value) => handleOnChangeEdit('daysSinceLastCall', value)}
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
