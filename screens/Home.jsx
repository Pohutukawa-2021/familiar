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
      <View style={styles.textBox}>
        <Text style={styles.label}>familiar</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable onPress={() => props.navigation.navigate('Add')}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>

        {data.length > 0
          ? <View style={styles.cardsContainer}>
            {data.map(contact => {
              return <TouchableOpacity style={styles.card} key={'tapp' + contact.name} onPress={() => props.navigation.navigate('Contact Details', { contact })}>
                <Card key={contact.name} {...contact} />
              </TouchableOpacity>
            })}
          </View>
          : <Text>Press + to add some contacts!</Text>
        }
      </ScrollView>
      {/* <Button title='Set' onPress={handleSet} />
      <Button title='Clear' onPress={handleClear} /> */}

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
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 20
  },
  textBox: {
    marginTop: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
    backgroundColor: '#22CAFF'
  },
  label: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 10
  },
  buttonView: {
    position: 'absolute',
    top: 36,
    right: 20
  },
  buttonText: {
    fontSize: 45,
    color: 'white'
  }
})

export default Home
