import React, { useState, useEffect } from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View, Pressable, Alert, Button } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { saveData, readData, clear } from '../helpers/helperFunc'
import { NotificationHandler } from '../components/Notifications'
import { original, fastForward } from '../helpers/dummyData'
import ButtonClickAnimate from '../components/ButtonClickAnimation'

function AddOnFeatures(props) {
  const [data, setData] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    async function getData() {
      const data = await readData()
      if (data) {
        setData(data)
      } else {
        setData([])
      }
    }
    getData()
  }, [isFocused])

  // for development purposes only, DELETE this later
  function handleSet() {
    saveData(original)
  }
  function handleTimeWarp() {
    saveData(fastForward)
  }

  async function activateNotification() {
    const userData = fastForward[0]
    await props.schedulePushNotification(
      userData.lastCall,
      userData.frequency,
      userData,
      true
    )
  }

  // for development purposes only, DELETE this later
  function handleClear() {
    Alert.alert(
      'Are you sure?',
      'Clicking yes will clear all of your contacts!',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            clear()
            Alert.alert('Your contact list was cleared')
          },
          style: 'ok'
        }
      ],
      {
        cancelable: true
      }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.label}>Settings</Text>
      </View>

      <View style={styles.innerContainer}>
        <ButtonClickAnimate onPress={() => handleClear()}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>Clear Data</Text>
          </View>
        </ButtonClickAnimate>
        <ButtonClickAnimate onPress={() => handleSet()}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>Set Data</Text>
          </View>
        </ButtonClickAnimate>
        <ButtonClickAnimate onPress={() => handleTimeWarp()}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>Time-Warp Data</Text>
          </View>
        </ButtonClickAnimate>
        <ButtonClickAnimate onPress={() => activateNotification()}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>Set Notification</Text>
          </View>
        </ButtonClickAnimate>
        {/* <Button title="Set" onPress={handleSet} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBox: {
    marginTop: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#22CAFF',
    backgroundColor: '#22CAFF'
  },
  label: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 52,
    // marginRight: 30,
    marginBottom: 10
  },
  buttonView: {
    width: 200,
    backgroundColor: '#29E25D',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: '80%',
    color: 'grey'
  }
})

export { AddOnFeatures }

export default NotificationHandler(AddOnFeatures)
