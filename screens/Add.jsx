import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

function Add () {
  const [addForm, setAddForm] = React.useState({
    name: '',
    number: '',
    frequency: ''
  })

  function handleOnChangeAdd (name, value) {
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
          value={addForm.name}
          placeholder='name'
          keyboardType="default"
          onChangeText={(value) => handleOnChangeAdd('name', value)}
        />
        <TextInput
          style={styles.input}
          value={addForm.number}
          placeholder='number'
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeAdd('number', value)}
        />
        <TextInput
          style={styles.input}
          value={addForm.frequency}
          placeholder='frequency'
          keyboardType="default"
          onChangeText={(value) => handleOnChangeAdd('frequency', value)}
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
