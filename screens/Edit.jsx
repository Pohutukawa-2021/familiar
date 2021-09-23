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

  function handleOnChangeEdit (e) {
    const { name, value } = e.target
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
          name="name"
          value={name}
          placeholder='name'
          keyboardType="default"
          onChange={handleOnChangeEdit}
        />
        <TextInput
          style={styles.input}
          name="number"
          value={number}
          placeholder='number'
          keyboardType="numeric"
          onChange={handleOnChangeEdit}
        />
        <TextInput
          style={styles.input}
          name="frequency"
          value={frequency}
          placeholder='frequency'
          keyboardType="default"
          onChange={handleOnChangeEdit}
        />
        <TextInput
          style={styles.input}
          name="daysSinceLastCall"
          value={daysSinceLastCall}
          placeholder='daysSinceLastCall'
          keyboardType="numeric"
          onChange={handleOnChangeEdit}
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
