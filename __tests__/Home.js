import React from 'react'
// import { fireEvent } from '@testing-library/react-native'
import Home from '../screens/Home'
import { render } from '@testing-library/react-native'

jest.mock('../helpers/helperFunc')

afterAll(() => {
  jest.resetAllMocks()
})

// when localStorage is empty home dsplays welcome message
// buttons redirect appropriatly
// right amount of cards

test('home screen displays message when no contacts have been added', async () => {
  // const mockNavigate = jest.fn()

  const { getByText } = render(
    <Home />
  )

  expect(getByText(/fam/)).toBe(false)
})
