import React, { useState, useEffect, useRef } from 'react'

/* eslint-disable-next-line */
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import moment from 'moment'
import { Alert } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export const NotificationHandler = (WrappedContent) =>
  function HOC(props) {
    const [expoPushToken, setExpoPushToken] = useState('')
    const [notification, setNotification] = useState({})
    const notificationListener = useRef()
    const responseListener = useRef()

    useEffect(() => {
      registerForPushNotificationsAsync()
        .then((token) => setExpoPushToken(token))
        .catch((err) => {
          // console.log(err)
        })

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification)
        })

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const parsedData = response.notification.request.content.data
          props.navigation.navigate('Contact Details', {
            contact: parsedData
          })
        })

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }, [])
    return (
      <WrappedContent
        schedulePushNotification={schedulePushNotification}
        cancelPushNotification={cancelPushNotification}
        {...props}
      />
    )
  }

function schedulePushNotification(lastCall, frequency, user, demo = false) {
  let scheduledTime = moment(lastCall).add(frequency, 'days')
  if (!lastCall) {
    scheduledTime = moment().add(frequency, 'days')
  }
  const timeInSeconds = moment.duration(scheduledTime).asSeconds()
  return Notifications.scheduleNotificationAsync({
    content: {
      title: `Reminder to call ${user.name}`,
      body: `You have not called ${user.name} in a while`,
      data: user
    },
    trigger: { seconds: !demo ? timeInSeconds : 10 }
  })
}

function cancelPushNotification(identifier) {
  return Notifications.cancelScheduledNotificationAsync(identifier)
}

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    // Alert.alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  return token
}
