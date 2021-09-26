import React, { useState, useEffect } from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View, Button, TouchableOpacity,Pressable,ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Card from '../components/Card'
import { saveData, readData, clear } from '../helpers/helperFunc'

import dummyData from '../helpers/dummyData'

function Home (props) {
  const [data, setData] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    async function getData () {
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
  function handleSet () {
    saveData(dummyData)
  }

  // for development purposes only, DELETE this later
  function handleClear () {
    clear()
  }

  return (

    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
        <Text style={styles.label}>familiar</Text>

        {data.length > 0
          ? <View style={styles.cardsContainer}>
            {data.map(contact => {
              return <TouchableOpacity key={'tapp' + contact.name} onPress={() => props.navigation.navigate('Contact Details', { contact })}>
                <Card key={contact.name} {...contact} />
              </TouchableOpacity>
            })}
          </View>
          : <Text>Press 'add' to add some contacts!</Text>
        }

      </ScrollView>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => props.navigation.navigate('Add')}>
          <Text style={styles.buttonText}>Add new contact</Text>
        </Pressable>
        <Button title='Set' onPress={handleSet} />
        <Button title='Clear' onPress={handleClear} />
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
    width: '80%',
    marginTop: 20,
    marginBottom: 60
  },
  cardsContainer: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  label: {
    alignSelf: 'center',
    fontSize: 25,
    color: 'black'
  },
  buttonView: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    borderRadius: 35
  },
  button: {
    backgroundColor: '#5AF160',
    width: '80%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 35
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  }
})

export default Home
