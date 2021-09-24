import React, { useState, useEffect } from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Card from '../components/Card'
import { saveData, readData, clear } from './helperFunc'

const dummyData = [
  {
    name: 'Dad',
    number: '021-1234567',
    frequency: 7,
    lastCall: '2021/09/20'
  },
  {
    name: 'Mum',
    number: '021-9876567',
    frequency: 3,
    lastCall: '2021/09/21'
  },
  {
    name: 'Austin',
    number: '021-1235358',
    frequency: 14,
    lastCall: '2021/09/09'
  },
  {
    name: 'Ali',
    number: '021-1256778',
    frequency: 30,
    lastCall: '2020/09/24'
  }
]

function Home (props) {
  const [data, setData] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    async function getData () {
      setData(await readData())
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
      <Text>Welcome to Familiar.</Text>

      {data
        ? <View style={styles.cardsContainer}>
          {data.map(contact => {
            return <TouchableOpacity key={'tapp' + contact.name} onPress={() => props.navigation.navigate('ContactDetails', { contact })}>
              <Card key={contact.name} {...contact} />
            </TouchableOpacity>
          })}
        </View>
        : <Text>Add some people</Text>
      }

      <View>
        <Button title='Add new contact' />

        <Button title='Set' onPress={handleSet}/>
        <Button title='Clear' onPress={handleClear}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    // flexDirection: 'row'
  },
  cardsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12
  }
})

export default Home
