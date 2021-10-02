import React from 'react'
import { fireEvent, cleanup, act } from '@testing-library/react-native'
import { Add } from '../../screens/Add'
import { renderWithNavigation } from '../../jest/test-utils'
import { saveData, readData } from '../../helpers/helperFunc'

jest.mock('../../helpers/helperFunc', () => {
  return {
    ...jest.requireActual('../../helpers/helperFunc'),
    saveData: jest.fn(),
    readData: jest.fn()
  }
})

const mockScheduleNotification = jest.fn(() => Promise.resolve())
const mockCancelNotification = jest.fn(() => Promise.resolve())

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)

test('Save input values to the localStorage', async () => {
  const mockNavigate = jest.fn()

  const { getByPlaceholderText, getByText } = renderWithNavigation(
    <Add
      navigation={{ navigate: mockNavigate }}
      schedulePushNotification={mockScheduleNotification}
      cancelPushNotification={mockCancelNotification}
    />,
    'stack'
  )

  let nameInput, numberInput
  act(() => {
    nameInput = getByPlaceholderText('name')
    numberInput = getByPlaceholderText('number')
  })

  // const frequencyInput = getByPlaceholderText('frequency in days')
  await fireEvent.changeText(nameInput, 'mum')
  await fireEvent.changeText(numberInput, '22322')
  // await fireEvent.changeText(frequencyInput, '22')

  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve())

  await act(async () => {
    await fireEvent.press(getByText('Add'))
  })

  expect(saveData).toHaveBeenCalled()
  expect(readData).toHaveBeenCalled()

  expect(mockNavigate).toHaveBeenCalledWith('Home')
})
