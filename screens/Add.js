import React, { useState, useEffect } from 'react'

/* eslint-disable-next-line */
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert, Platform, KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import ButtonClickAnimate from '../components/ButtonClickAnimation'
import moment from 'moment'
import {
  saveData,
  readData,
  formCheck,
  convertDays,
  handleFreqChange
} from '../helpers/helperFunc'
import Slider from '@react-native-community/slider'
import { NotificationHandler } from '../components/Notifications'

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
      frequency: 1,
      callCount: 0
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

    const data = await readData()
    let names = []
    data ? (names = data.map((values) => values.name)) : (names = [])

    const err = formCheck(form, names)
    if (err !== '') {
      Alert.alert('Error', `Invalid field(s): ${err}`)
    } else {
      // Push Notification setting
      let identifier
      try {
        identifier = await props.schedulePushNotification(
          form.lastCall,
          form.frequency,
          form
        )
      } catch (err) {
        console.log(err)
      }
      data
        ? saveData([...data, { ...form, identifier }]) &&
          props.navigation.navigate('Home')
        : saveData([form]) && props.navigation.navigate('Home') // in case no data exists
    }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.innerContainer}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'position'}
            keyboardVerticalOffset={30}
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
            <Text style={styles.text}>
              Call Frequency: {convertDays(addForm.frequency)}
            </Text>
            <Slider
              step={1}
              minimumValue={1}
              maximumValue={8}
              style={styles.slider}
              onValueChange={(value) =>
                handleFreqChange(value, handleOnChangeAdd)
              }
            />
            <View style={styles.buttonView}>
              <ButtonClickAnimate onPress={handlePressAdd}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Add</Text>
                </View>
              </ButtonClickAnimate>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
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
    width: '100%',
    marginTop: 40,
    paddingHorizontal: '8%'
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
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500',
    margin: 0
  }
})

export { Add }

export default NotificationHandler(Add)
