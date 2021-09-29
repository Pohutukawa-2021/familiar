import React, { useEffect } from 'react'
/* eslint-disable-next-line */
import {
  View,
  TextInput,
  Text,
  Pressable,
  ScrollView,
  Alert
} from 'react-native'
import { styles } from './Add'
import { readData, saveData, formCheck } from '../helpers/helperFunc'
import Slider from '@react-native-community/slider'
import { NotificationHandler } from '../components/Notifications'

function Edit(props) {
  let name, number, frequency, lastCall, notificationId

  const [initalName, setInitalName] = React.useState('') // set initail name to match in local storage (in case the name gets edited)

  const [editForm, setEditForm] = React.useState({})

  useEffect(() => {
    name = props.route.params.contact.name
    number = props.route.params.contact.number
    frequency = props.route.params.contact.frequency
    lastCall = props.route.params.contact.lastCall
    notificationId = props.route.params.contact.identifier
    setEditForm({ name, number, frequency, lastCall })
    setInitalName(name)
    console.log(frequency)
  }, [props.route.params.contact.name])

  function handleOnChangeEdit(name, value) {
    const newEditForm = {
      ...editForm,
      [name]: value
    }
    setEditForm(newEditForm)
  }

  async function handlePressEdit() {
    const { name, number, frequency, lastCall } = editForm
    const contact = { name, number, frequency, lastCall } // construct object, only used to send to ContactDetails component

    const data = await readData()
    let names = []
    data
      ? (names = data.map((values) => {
          if (values.name !== initalName) {
            return values.name
          }
        }))
      : (names = [])

    const err = formCheck(editForm, names)
    if (err !== '') {
      Alert.alert('Error', `Invalid field(s): ${err}`)
    } else {
      // Cancels old notification and set new one
      let updatedNotificationId = notificationId
      if (notificationId) {
        await props.cancelPushNotification(notificationId)
      }

      updatedNotificationId = await props.schedulePushNotification(
        lastCall,
        frequency,
        editForm
      )

      const newData = data.map((value) => {
        if (value.name === initalName) {
          const newValue = {
            name,
            number,
            frequency,
            lastCall,
            identifier: updatedNotificationId
          }
          return newValue
        } else return value
      })

      saveData(newData)
      props.navigation.navigate('Contact Details', { contact })
    }
  }

  function convertDays() {
    switch (editForm.frequency) {
      case 1:
        return 'daily'
      case 3:
        return 'every 3 days'
      case 7:
        return 'weekly'
      case 14:
        return 'fortnightly'
      case 28:
        return 'monthly'
      case 84:
        return 'every 3 months'
      case 168:
        return 'every 6 months'
      case 365:
        return 'yearly'
      default:
        return editForm.frequency + ' days'
    }
  }

  function handleFreqChange(value) {
    switch (value) {
      case 1:
        handleOnChangeEdit('frequency', 1)
        break
      case 2:
        handleOnChangeEdit('frequency', 3)
        break
      case 3:
        handleOnChangeEdit('frequency', 7)
        break
      case 4:
        handleOnChangeEdit('frequency', 14)
        break
      case 5:
        handleOnChangeEdit('frequency', 28)
        break
      case 6:
        handleOnChangeEdit('frequency', 84)
        break
      case 7:
        handleOnChangeEdit('frequency', 168)
        break
      case 8:
        handleOnChangeEdit('frequency', 365)
        break
    }
  }
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.innerContainer}
        >
          <Text style={styles.h1}>Update</Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={editForm.name}
            placeholder="name"
            keyboardType="default"
            onChangeText={(value) => handleOnChangeEdit('name', value)}
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={editForm.number}
            placeholder="number"
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangeEdit('number', value)}
          />
          <Text style={styles.text}>Call Frequency: {convertDays()}</Text>
          <Slider
            step={1}
            minimumValue={1}
            maximumValue={8}
            style={styles.slider}
            onValueChange={(value) => handleFreqChange(value)}
          />
          {/* <Text style={styles.label}>Frequency</Text>
          <TextInput
            style={styles.input}
            value={editForm.frequency}
            placeholder="frequency in days"
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangeEdit('frequency', value)}
          /> */}
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handlePressEdit}>
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export { Edit }

export default NotificationHandler(Edit)
