import React, { useState, useEffect } from 'react'

/* eslint-disable-next-line */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Alert
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment'
import { saveData, readData, formCheck } from '../helpers/helperFunc'

function Add (props) {
  const isFocused = useIsFocused() // detetcs when page is rendered

  const [addForm, setAddForm] = useState({
    name: '',
    number: '',
    frequency: '',
    lastCall: ''
  })

  // clears state when page is rendered
  useEffect(() => {
    setAddForm({
      name: '',
      number: '',
      frequency: ''
    })
  }, [isFocused])

  function handleOnChangeAdd (name, value) {
    const newAddForm = {
      ...addForm,
      [name]: value
    }
    setAddForm(newAddForm)
  }

  async function handlePressAdd () {
    // adds date into form object to be saved
    const form = {
      ...addForm,
      lastCall: moment().format()
    }

    const err = formCheck(form)
    if (err !== '') {
      Alert.alert(
        'Error',
        `Invalid field(s): ${err}`
      )
    } else {
      const data = await readData()
      data
        ? saveData([...data, form]) && props.navigation.navigate('Home')
        : saveData([form]) && props.navigation.navigate('Home') // in case no data exists
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.innerContainer}
      >
        <Text style={styles.h1}>New Contact</Text>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={addForm.name}
          placeholder="name"
          keyboardType="default"
          onChangeText={(value) => handleOnChangeAdd('name', value)}
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={addForm.number}
          placeholder="number"
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeAdd('number', value)}
        />
        <Text style={styles.label}>Frequency</Text>
        <TextInput
          style={styles.input}
          value={addForm.frequency}
          placeholder="frequency in days"
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeAdd('frequency', value)}
        />
        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={handlePressAdd}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innerContainer: {
    width: '80%',
    marginTop: 40
  },
  input: {
    width: '95%',
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#edf4ff',
    fontSize: 20,
    backgroundColor: '#edf4ff'
  },
  h1: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black'
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
