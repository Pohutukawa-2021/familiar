import React, { useEffect, useState } from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { readData } from '../helpers/helperFunc'
import moment from 'moment'

function History (props) {
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

  function fixPlurals (value) {
    if (value === undefined) {
      return 'called 0 time'
    } else if (value === 1) {
      return 'called ' + value + ' time'
    } else return 'called ' + value + ' times'
  }

  function showProgress (value) {
    const Num = Number(value)
    cono
    switch (Num) {
      case (Num < 1):
        return 'x'
      case (Num < 3):
        return 'test'
      case (Num < 7):
        return 'x'
      case (Num < 14):
        return 'x'
      case (Num < 30):
        return 'x'
      case (Num < 60):
        return 'x'
      case (Num < 90):
        return 'x'
      default:
        return 'default'
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
                      <Text>{contact.name} {showProgress(contact.callCount)}</Text>
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
    textAlign: 'right',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 52,
    marginRight: 30,
    marginBottom: 10
  }
})

export default History
