import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

function Add () {
  const [addForm, setAddForm] = React.useState({
    name: '',
    number: '',
    frequency: ''
  })

  function handleOnChangeAdd (e) {
    const { name, value } = e.target
    const newAddForm = {
      ...addForm,
      [name]: value
    }
    setAddForm(newAddForm)
  }

  function handlePressAdd () {
    // send addForm object to localstorage
    // redirect to Home component
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          name="name"
          value={addForm.name}
          placeholder='name'
          keyboardType="default"
          onChange={handleOnChangeAdd}
        />
        <TextInput
          style={styles.input}
          name="number"
          value={addForm.number}
          placeholder='number'
          keyboardType="numeric"
          onChange={handleOnChangeAdd}
        />
        <TextInput
          style={styles.input}
          name="frequency"
          value={addForm.frequency}
          placeholder='frequency'
          keyboardType="default"
          onChange={handleOnChangeAdd}
        />
      </View>
      <View>
        <Button title='Add' onPress={handlePressAdd}/>
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

export default Add
