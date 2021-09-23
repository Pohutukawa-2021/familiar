import React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

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
        <TextInput
          style={styles.input}
          value={name}
          placeholder='name'
          keyboardType="default"
          onChange={(value) => handleOnChangeEdit('name', value)}
        />
        <TextInput
          style={styles.input}
          value={number}
          placeholder='number'
          keyboardType="numeric"
          onChange={(value) => handleOnChangeEdit('number', value)}
        />
        <TextInput
          style={styles.input}
          value={frequency}
          placeholder='frequency'
          keyboardType="default"
          onChange={(value) => handleOnChangeEdit('frequency', value)}
        />
        <TextInput
          style={styles.input}
          value={daysSinceLastCall}
          placeholder='daysSinceLastCall'
          keyboardType="numeric"
          onChange={(value) => handleOnChangeEdit('daysSinceLastCall', value)}
        />
      </View>
      <View>
        <Button title="Submit" onPress={handlePressEdit} />
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})

export default Edit
