import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Card from '../components/Card'

function Home (props) {
  const dummyData =
  [
    {
      name: 'Dad',
      number: '021-1234567',
      frequency: '1 per week',
      lastCall: '2021/09/10'
    },
    {
      name: 'Mum',
      number: '021-9876567',
      frequency: '2 per week',
      lastCall: '2020/02/10'
    },
    {
      name: 'Austin',
      number: '021-1235358',
      frequency: '1 per day',
      lastCall: '2021/07/12'
    },
    {
      name: 'Ali',
      number: '021-1256778',
      frequency: '1 per month',
      lastCall: '2021/08/21'
    }
  ]

  return (

    <View style={styles.container}>
      <Text>Welcome to Familiar.</Text>
      <View style={styles.cardsContainer}>
        {dummyData.map(contact => {
          return <Card key={contact.name} {...contact} />
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
