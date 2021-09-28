import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react-native'
import { Platform, Linking } from 'react-native'
import ContactDetails from '../../screens/ContactDetails'
import { renderWithNavigation } from '../../jest/test-utils'
import { saveData, readData, color, convertDays } from '../../helpers/helperFunc'
import moment from 'moment'

jest.mock('../../helpers/helperFunc')
jest.mock('moment')

// mocks the call functionality
jest.mock('react-native/Libraries/Linking/Linking')

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const platform = {
    OS: 'android'
  }

  const select = jest.fn().mockImplementation((obj) => {
    const value = obj[platform.OS]
    return !value ? obj.default : value
  })

  platform.select = select

  return platform
})

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

beforeEach(() => {
  Linking.openURL = jest.fn(() => Promise.resolve())
  saveData.mockClear()
})

test('Should display the correct contact details e.g name, number', async () => {
  const mockNavigate = jest.fn()
  convertDays.mockImplementation(() => 'every 3 days')


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
  const frequencyText = getByText(new RegExp('Call Frequency: ' + convertDays(frequency)))
  const lastCallText = getByText(new RegExp('Last called: ' + lastCall))

  expect(nameText).toBeTruthy()
  expect(numberText).toBeTruthy()
  expect(frequencyText).toBeTruthy()
  expect(lastCallText).toBeTruthy()
})

test('Should update lastCall when call button pressed', async () => {
  const mockNavigate = jest.fn()

  const { getByTestId } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    { contact: { name, number, frequency, lastCall } }
  )

  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve([]))

  await fireEvent.press(getByTestId('callButton'))

  expect(saveData).toHaveBeenCalled()
  expect(readData).toHaveBeenCalled()
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

test('Should increase call count when call button is clicked on', async () => {
  const mockNavigate = jest.fn()
  const mockSaveData = jest.fn(() => Promise.resolve())
  saveData.mockImplementation(() => mockSaveData)
  readData.mockImplementation(() => Promise.resolve([{ callCount: 1, name }]))

  const { getByTestId } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    {
      contact: { name, number, frequency, lastCall }
    }
  )

  const callButton = getByTestId('callButton')
  await fireEvent.press(callButton)
  expect(saveData.mock.calls[0][0][0].callCount).toBe(2)
  expect(Linking.openURL).toHaveBeenCalledTimes(1)
})

test('Should invoke the call method when call button is clicked on', async () => {
  const mockNavigate = jest.fn()
  const { getByTestId } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    {
      contact: { name, number, frequency, lastCall }
    }
  )

  const callButton = getByTestId('callButton')
  await fireEvent.press(callButton)
  expect(Linking.openURL).toHaveBeenCalledTimes(1)
})

test('Should pass the correct phone number format in ios', async () => {
  const mockNavigate = jest.fn()
  // set platform to ios
  Platform.OS = 'ios'

  const { getByTestId } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    {
      contact: { name, number, frequency, lastCall }
    }
  )

  const callButton = getByTestId('callButton')
  await fireEvent.press(callButton)
  expect(Linking.openURL).toHaveBeenCalledWith(`telprompt:${number}`)
})

test('Should pass the correct phone number format in android', async () => {
  const mockNavigate = jest.fn()
  // set platform to android
  Platform.OS = 'android'

  const { getByTestId } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    {
      contact: { name, number, frequency, lastCall }
    }
  )

  const callButton = getByTestId('callButton')
  await fireEvent.press(callButton)
  expect(Linking.openURL).toHaveBeenCalledWith(`tel:${number}`)
})

test('Should increase call count when already call button is clicked', async () => {
  const mockNavigate = jest.fn()
  const mockSaveData = jest.fn(() => Promise.resolve())
  saveData.mockImplementation(() => mockSaveData)
  readData.mockImplementation(() => Promise.resolve([{ callCount: 1, name }]))

  const { getByText } = renderWithNavigation(
    <ContactDetails navigation={{ navigate: mockNavigate }} />,
    'stack',
    {
      contact: { name, number, frequency, lastCall }
    }
  )

  const callButton = getByText('Already Called')
  await fireEvent.press(callButton)
  expect(saveData.mock.calls[0][0][0].callCount).toBe(2)
})
