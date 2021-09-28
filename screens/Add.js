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
import Slider from '@react-native-community/slider'

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
      frequency: 1
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

  function convertDays () {
    switch (addForm.frequency) {
      case 1:
        return 'day'
      case 3:
        return '3 days'
      case 7:
        return 'week'
      case 14:
        return 'fortnight'
      case 28:
        return 'month'
      case 84:
        return '3 months'
      case 168:
        return '6 months'
      case 365:
        return 'year'
      default:
        return addForm.frequency + ' days'
    }
  }

  function handleFreqChange (value) {
    switch (value) {
      case 1:
        handleOnChangeAdd('frequency', 1)
        break
      case 2:
        handleOnChangeAdd('frequency', 3)
        break
      case 3:
        handleOnChangeAdd('frequency', 7)
        break
      case 4:
        handleOnChangeAdd('frequency', 14)
        break
      case 5:
        handleOnChangeAdd('frequency', 28)
        break
      case 6:
        handleOnChangeAdd('frequency', 84)
        break
      case 7:
        handleOnChangeAdd('frequency', 168)
        break
      case 8:
        handleOnChangeAdd('frequency', 365)
        break
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
        <Text style={styles.text}>Call Frequency: every {convertDays()}</Text>
        <Slider
          step={1}
          minimumValue={1}
          maximumValue={8}
          style={styles.slider}
          onValueChange={value => handleFreqChange(value)} />
        {/* <TextInput
          style={styles.input}
          value={addForm.frequency}
          placeholder="frequency in days"
          keyboardType="numeric"
          onChangeText={(value) => handleOnChangeAdd('frequency', value)}
        /> */}
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
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '500',
    margin: 0
  }
})

export default Add
