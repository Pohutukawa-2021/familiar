import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native'

export default function ButtonAnimate(props) {
  // Initial scale value of 1 means no scale applied initially.
  const animatedButtonScale = new Animated.Value(1)
  const animatedButtonShadow = new Animated.Value(0)

  // When button is pressed in, animate the scale to 1.5
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.1,
      useNativeDriver: true
    }).start()

    Animated.spring(animatedButtonShadow, {
      toValue: 0.27,
      useNativeDriver: true
    }).start()
  }

  // When button is pressed out, animate the scale back to 1
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true
    }).start()
    Animated.spring(animatedButtonShadow, {
      toValue: 0,
      useNativeDriver: true
    }).start()
  }

  // The animated style for scaling the button within the Animated.View
  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: animatedButtonShadow,
    shadowRadius: 4.65,
    elevation: 0
  }
  return (
    <TouchableWithoutFeedback
      {...props}
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[animatedScaleStyle]}>
        {props.children}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
