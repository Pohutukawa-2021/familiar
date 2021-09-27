import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import Add from '../../screens/Add'
import { renderWithNavigation } from '../../jest/test-utils'
import { saveData, readData } from '../../helpers/helperFunc'

jest.mock('../../helpers/helperFunc')

afterAll(() => {
  jest.resetAllMocks()
})

test('Save input values to the localStorage', async () => {
  const mockNavigate = jest.fn()

  const { getByPlaceholderText, getByText } = renderWithNavigation(
    <Add navigation={{ navigate: mockNavigate }} />,
    'stack'
  )
  const nameInput = getByPlaceholderText('name')
  const numberInput = getByPlaceholderText('number')
  const frequencyInput = getByPlaceholderText('frequency in days')
  await fireEvent.changeText(nameInput, 'mum')
  await fireEvent.changeText(numberInput, '22322')
  await fireEvent.changeText(frequencyInput, '22')

  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve([]))

  await fireEvent.press(getByText('Add'))

  expect(saveData).toHaveBeenCalled()
  expect(readData).toHaveBeenCalled()

  expect(mockNavigate).toHaveBeenCalledWith('Home')
})
