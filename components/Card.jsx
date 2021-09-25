import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

import { color } from '../screens/helperFunc'

function Card (props) {
  const difference = moment().diff(props.lastCall, 'days')

  const boxColor = {
    backgroundColor: color(difference, props.frequency)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.colorBox, boxColor]} />
      <View style={styles.textDetails}>
        <View>
          <Text numberOfLines={1} ellipsizeMode='tail'>{props.name}{'\n'}</Text>
          <Text numberOfLines={1} ellipsizeMode='tail'>{moment(props.lastCall).fromNow()}</Text>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: 145,
    height: 200,
    margin: 5,
    padding: 5
  },
  colorBox: {
    width: '100%',
    height: '50%',
    backgroundColor: 'dodgerblue',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  textDetails: {
    width: '100%',
    height: '50%',
    padding: 12,
    backgroundColor: '#E8E7E7',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  }

})

export default Card
