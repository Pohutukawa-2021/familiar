import React from 'react'
import { render } from '@testing-library/react-native'
import moment from 'moment'

import Card from '../components/Card'
import { color } from '../helpers/helperFunc'

describe('Card component renders with correct information', () => {
  const data = {
    name: 'Mum',
    lastCall: '2021-09-20T23:11:17+12:00'
  }

  test('Card should display the same text passed to it', () => {
    const { getByText } = render(<Card { ...data } />)
    expect(getByText(/Mum/)).toBeTruthy()
  })

  test('Card color should displayed be the same as the value returned from color function', () => {
    const difference = moment().diff(data.lastCall, 'days')
    const expected = color(difference, data.frequency)
    const { getByTestId } = render(<Card { ...data } />)
    const actual = getByTestId('colorBox').props.style[1].backgroundColor
    expect(expected).toEqual(actual)
  })
})
