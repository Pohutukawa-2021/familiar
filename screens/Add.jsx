import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native'
import { saveData, readData } from './helperFunc'

function Add (props) {
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

  // TODO need to save the date as well
  async function handlePressAdd () {
    const data = await readData()
    data
      ? saveData([...data, addForm]) && props.navigation.navigate('Home')
      : saveData([addForm]) && props.navigation.navigate('Home')
  }

  return (

    <View style={styles.container}>
      <View style={styles.innerContainer} >
        <Text style={styles.h1}>Add</Text>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={addForm.name}
          placeholder='name'
          keyboardType="default"
          onChangeText={(value) => handleOnChangeAdd('name', value)}
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={addForm.number}
          placeholder='number'
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeAdd('number', value)}
        />
        <Text style={styles.label}>Frequency</Text>
        <TextInput
          style={styles.input}
          value={addForm.frequency}
          placeholder='frequency'
          keyboardType="default"
          onChangeText={(value) => handleOnChangeAdd('frequency', value)}
        />
        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={handlePressAdd} >
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View >

  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innerContainer: {
    width: '80%',
    marginTop: 40
  },
  input: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 20
  },
  h1: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30
  },
  label: {
    width: '80%',
    fontSize: 25,
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

export default Add
