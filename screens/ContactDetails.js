import React from 'react'
/* eslint-disable-next-line */
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Linking,
  Platform,
  Alert
} from 'react-native'
import { saveData, readData, color } from '../helpers/helperFunc'
import moment from 'moment'

function ContactDetails (props) {
  const { name, number, frequency, lastCall } = props.route.params.contact
  const contact = { name, number, frequency, lastCall } // construct object, only used to send to Edit component

  async function handlePressCall () {
    await sendData()
    await call(number)
  }

  async function handlePressCalled () {
    await sendData()
    props.navigation.navigate('Home')
  }

  async function sendData () {
    const data = await readData()
    const newData = data.map((value) => {
      if (value.name === name) {
        const newValue = {
          ...value,
          lastCall: moment().format(),
          callCount: value.callCount + 1
        }
        return newValue
      } else {
        return value
      }
    })
    await saveData(newData)
  }

  function call (phNum) {
    const numToCall =
      Platform.OS === 'android' ? `tel:${phNum}` : `telprompt:${phNum}`
    return Linking.openURL(numToCall).catch((err) => console.log(err))
  }

  // dynamically changes the box color
  const difference = moment().diff(lastCall, 'days')
  const boxColor = {
    backgroundColor: color(difference, frequency)
  }

  // deletes contact, redirects Home
  async function handleDelete () {
    const data = await readData()
    const newData = data.filter((value) => {
      if (value.name !== name) {
        return value
      }
    })
    saveData(newData)
    props.navigation.navigate('Home')
  }

  function edit () {
    props.navigation.navigate('Edit', { contact })
  }

  // Note: For last called text, the date format is set in line
  return (
    <View style={styles.container}>
      <View
        testID="indicator-background"
        style={[styles.topContainer, boxColor]}
      >
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.h1}>
          {name}
        </Text>
        <Pressable style={styles.navEdit} onPress={edit}>
          <Text style={styles.editText}>edit</Text>
        </Pressable>
      </View>

      <Pressable style={styles.navDelete} onPress={handleDelete}>
        <Image style={styles.image} source={require('../assets/delete.png')} />
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.innerContainer}
      >
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>
          Name: {name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>
          Number: {number}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>
          Frequency: {frequency}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>
          Last called: {moment(lastCall).format('DD/MM/YYYY')}
          </Text>
        </View>

        <View style={styles.callBtn}>
          <Pressable onPress={handlePressCall}>
            <Image source={require('../assets/call.png')} />
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handlePressCalled}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.buttonText}
          >
              Already Called
          </Text>
        </Pressable>
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
  image: {
    width: 40,
    height: 40
  },
  topContainer: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  navEdit: {
    alignSelf: 'center',
    marginBottom: 60
  },
  navDelete: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  innerContainer: {
    width: '80%',
    padding: 20
  },
  h1: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 60
  },
  label: {
    width: '80%',
    fontSize: 20,
    marginBottom: 5
  },
  buttonView: {
    width: '70%',
    borderRadius: 35
  },
  button: {
    backgroundColor: '#5AF160',
    padding: 10,
    borderRadius: 35,
    marginBottom: 15
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  editText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
  callBtn: {
    alignSelf: 'center',
    margin: 40
  },
  textContainer: {
    paddingTop: 20
  }
})

export default ContactDetails
