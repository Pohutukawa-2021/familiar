import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Card from '../components/Card'

function Home (props) {
  return (
    <>
      <View style={styles.container}>
        <Text>Welcome to Familiar.</Text>
        <View>
          {/* {props.contacts.map(contact => {
            <Card {...contact} />
          })} */}
        </View>
      </View>
      <View>
        <Button title='Add new contact' />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Home
