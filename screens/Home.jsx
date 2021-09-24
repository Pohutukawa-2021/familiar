import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import Card from '../components/Card'

function Home (props) {
  const dummyData =
  [
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

  return (

    <View style={styles.container}>
      <Text>Welcome to Familiar.</Text>
      <View style={styles.cardsContainer}>
        {dummyData.map(contact => {
          return <TouchableOpacity key={'tapp' + contact.name} onPress={() => props.navigation.navigate('ContactDetails')}>
            <Card key={contact.name} {...contact} />
          </TouchableOpacity>
        })}
        {/* {props.contacts.map(contact => {
          <Card {...contact} />
        })} */}
      </View>
      <View>
        <Button title='Add new contact' />
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
