import React from 'react'
import { act, cleanup, fireEvent } from '@testing-library/react-native'
import { AddOnFeatures as Settings } from '../../screens/Settings'
import { renderWithNavigation } from '../../jest/test-utils'
import { clear } from '../../helpers/helperFunc'
import { Alert } from 'react-native'

jest.mock('../../helpers/helperFunc')

const spyAlert = jest.spyOn(Alert, 'alert')

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(() => {
  cleanup()
  clear.mockClear()
})

// when localStorage is empty home dsplays welcome message
// buttons redirect appropriatly
// right amount of cards

it('Should display a clear data button', async () => {
  const mockNavigate = jest.fn()

  const { findByText } = renderWithNavigation(
    <Settings navigation={{ navigate: mockNavigate }} />,
    'stack'
  )
  let button
  await act(async () => {
    button = await findByText(/Clear Data/)
  })
  expect(button).toBeTruthy()
})

it('Should clear contact list when clear data btn is clicked', async () => {
  const mockNavigate = jest.fn()

  const { findByText } = renderWithNavigation(
    <Settings navigation={{ navigate: mockNavigate }} />,
    'stack'
  )

  await act(async () => {
    const button = await findByText(/Clear Data/)
    await fireEvent.press(button)
    // Clicks on Yes button on the Alert dialog
    spyAlert.mock.calls[0][2][1].onPress()
    expect(clear).toHaveBeenCalled()
  })
})

it('Should not clear contact list when cancel button is clicked', async () => {
  const mockNavigate = jest.fn()

  const { findByText } = renderWithNavigation(
    <Settings navigation={{ navigate: mockNavigate }} />,
    'stack'
  )

  await act(async () => {
    const button = await findByText(/Clear Data/)
    await fireEvent.press(button)
    // Clicks on Cancel button on the Alert dialog
    spyAlert.mock.calls[0][2][0].onPress()
    expect(clear).not.toHaveBeenCalled()
  })
})
