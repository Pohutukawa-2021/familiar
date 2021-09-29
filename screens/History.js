import React, { useEffect, useState } from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { readData } from '../helpers/helperFunc'
import { Fontisto } from '@expo/vector-icons'
import { NotificationHandler } from '../components/Notifications'

function History(props) {
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

  function fixPlurals (value) {
    if (value === 0) {
      return 'Not yet called'
    } else if (value === 1) {
      return 'called once'
    } else return 'called ' + value + ' times'
  }

  function showProgress (value) {
    if (value === undefined) {
      value = 0
    }
    if (value === 0) {
      return <Fontisto name="confused" size={20} color="black" />
    } else if (value < 5) {
      return <Fontisto name="slightly-smile" size={20} color="black" />
    } else {
      return <Fontisto name="smiley" size={20} color="black" />
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.label}>Call History</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.innerContainer}
      >
        {
          <View style={styles.listContainer}>
            {data.map((contact, index) => {
              return (
                <View
                  key={contact.name}
                  testID="indicator-background"
                  style={[
                    styles.listItemContainer,
                    index % 2 === 0
                      ? styles.greyBackground
                      : styles.whiteBackground
                  ]}
                >
                  <View style={styles.listItem}>
                    <View style={styles.textContainer}>
                      <Text>{contact.name}</Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text> {showProgress(contact.callCount)}</Text>
                    </View>
                    <View style={[styles.textContainer, styles.textCallCount]}>
                      <Text style={styles.textCallCount}>
                        {fixPlurals(contact.callCount)}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
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
    width: '90%',
    marginTop: 50,
    marginBottom: 60
  },
  listContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  listItemContainer: {
    width: '100%',
    padding: 18
  },
  listItem: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1
  },
  textCallCount: {
    textAlign: 'right'
  },
  greyBackground: {
    backgroundColor: '#E8E7E7'
  },
  whiteBackground: {
    backgroundColor: '#F9F9F9'
  },
  textBox: {
    marginTop: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'darkgrey',
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
  }
})

export { History }

export default NotificationHandler(History)
