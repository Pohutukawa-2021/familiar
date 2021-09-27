import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react-native'
import ContactDetails from '../../screens/ContactDetails'
import { renderWithNavigation } from '../../jest/test-utils'
import { saveData, readData, color } from '../../helpers/helperFunc'
import moment from 'moment'

jest.mock('../../helpers/helperFunc')
jest.mock('moment')

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)

let name, number, frequency, lastCall

beforeAll(() => {
  name = 'admin'
  number = '123'
  frequency = '3'
  lastCall = '2019/08/22'
})

test('Should display the correct contact details e.g name, number', async () => {
  const mockNavigate = jest.fn()

  moment.mockImplementation((arg) => ({
    format: (value) => arg,
    diff: (value) => value
  }))

  const { getByText } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    { contact: { name, number, frequency, lastCall } }
  )

  const nameText = getByText(new RegExp('Name: ' + name))
  const numberText = getByText(new RegExp('Number: ' + number))
  const frequencyText = getByText(new RegExp('Frequency: ' + frequency))
  const lastCallText = getByText(new RegExp('Last called: ' + lastCall))

  expect(nameText).toBeTruthy()
  expect(numberText).toBeTruthy()
  expect(frequencyText).toBeTruthy()
  expect(lastCallText).toBeTruthy()
})

test('Should update lastCall when call button pressed', async () => {
  const mockNavigate = jest.fn()

  const { getByText } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    { contact: { name, number, frequency, lastCall } }
  )

  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve([]))

  await fireEvent.press(getByText('Call'))

  expect(saveData).toHaveBeenCalled()
  expect(readData).toHaveBeenCalled()
})

test('Should navigate to home screen when call button is pressed', async () => {
  const mockNavigate = jest.fn()

  const { getByText } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    { contact: { name, number, frequency, lastCall } }
  )

  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve([]))

  await fireEvent.press(getByText('Call'))

  expect(saveData).toHaveBeenCalled()
  expect(readData).toHaveBeenCalled()

  expect(mockNavigate).toHaveBeenCalledWith('Home')
})

test('Should display the correct colour code for the background', async () => {
  const mockNavigate = jest.fn()

  color.mockImplementation(() => 'red')

  const { getByTestId } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    { contact: { name, number, frequency, lastCall } }
  )

  const indicatorBackground = getByTestId('indicator-background')
  expect(indicatorBackground.props.style[1].backgroundColor).toBe('red')
})
