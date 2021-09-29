import React, { useState, useEffect } from 'react'
import { color, saveData, readData, clear } from '../helpers/helperFunc'
import moment from 'moment'
import StyleSheet from 'react-native-media-query'
/* eslint-disable-next-line */
import {
  // StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Button,
  RefreshControl,
  Image
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Card from '../components/Card'
import dummyData from '../helpers/dummyData'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

function Home (props) {
  const [data, setData] = useState([])
  const isFocused = useIsFocused()
  const sortOrder = { red: 0, orange: 1, green: 2 }
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000)
      .then(() => {
        async function getData () {
          const data = await readData()
          if (data) {
            setData(data)
          } else {
            setData([])
          }
        }
        getData()
        setRefreshing(false)
        return null
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [])

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
          {/* <Text style={styles.buttonText}>+</Text> */}

          <Image style={styles.image} source={require('../assets/add.png')} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.innerContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {data.length > 0 ? (
          <View style={styles.cardsContainer} dataSet={{ media: ids.cardsContainer }} >
            {data.map((contact) => {
              const difference = moment().diff(contact.lastCall, 'days')
              const boxColor = color(difference, contact.frequency)
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={'tapp' + contact.name}
                  onPress={() =>
                    props.navigation.navigate('Contact Details', { contact })
                  }
                >
                  <Card key={contact.name} {...contact}
                    color={
                      boxColor === '#E00000'
                        ? 'red'
                        : boxColor === '#FF971D'
                          ? 'orange'
                          : 'green'
                    }
                  />
                </TouchableOpacity>
              )
            }).sort(function (p1, p2) {
              return sortOrder[p1.props.children.props.color] - sortOrder[p2.props.children.props.color]
            })
            }
          </View>
        ) : (
          <Text style={styles.emptyText}>Press + to add some contacts!</Text>
        )}
      </ScrollView>
      {/* <Button title='Set' onPress={handleSet} />
      <Button title='Clear' onPress={handleClear} /> */}
    </View>
  )
}

const { ids, styles } = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innerContainer: {
    width: '80%'
  },
  cardsContainer: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    '@media (min-width: 500px)': {
      justifyContent: 'flex-start'
    },
    '@media (max-width: 350px)': {
      flexDirection: 'column',
      justifyContent: 'center'
    },
    '@media (max-width: 1023px) and (min-width: 700px)': {
      marginLeft: 25
    },
    '@media (min-width: 1024px)': {
      marginLeft: 60
    }
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
    top: 49,
    right: 20
  },
  image: {
    height: 30,
    width: 30
  },
  buttonText: {
    fontSize: 45,
    color: 'white'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: '80%',
    color: 'grey'
  }
})

export default Home
