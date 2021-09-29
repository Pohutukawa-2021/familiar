import React from 'react'
import { act, cleanup } from '@testing-library/react-native'
import { Home } from '../../screens/Home'
import { renderWithNavigation } from '../../jest/test-utils'

jest.mock('../../helpers/helperFunc')

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)

// when localStorage is empty home dsplays welcome message
// buttons redirect appropriatly
// right amount of cards

it('home screen displays message when no contacts have been added', async () => {
  const mockNavigate = jest.fn()

  const { getByText } = renderWithNavigation(
    <Home navigation={{ navigate: mockNavigate }} />,
    'stack'
  )

  await act(async () => {
    expect(getByText(/Press/)).toBeTruthy()
  })
})
