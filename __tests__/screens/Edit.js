import React from 'react'
import { fireEvent } from '@testing-library/react-native'
import { Edit } from '../../screens/Edit'
import { renderWithNavigation } from '../../jest/test-utils'
import { saveData, readData } from '../../helpers/helperFunc'

jest.mock('../../helpers/helperFunc', () => {
  return {
    ...jest.requireActual('../../helpers/helperFunc'),
    saveData: jest.fn(),
    readData: jest.fn()
  }
})

afterAll(() => {
  jest.resetAllMocks()
})

const mockScheduleNotification = jest.fn(() => Promise.resolve())
const mockCancelNotification = jest.fn(() => Promise.resolve())

test('Update input values to the localStorage', async () => {
  const mockNavigate = jest.fn()

  const { getByText, getByDisplayValue, findByTestId } = renderWithNavigation(
    <Edit
      navigation={{ navigate: mockNavigate }}
      schedulePushNotification={mockScheduleNotification}
      cancelPushNotification={mockCancelNotification}
    />,
    'stack',
    {
      contact: {
        name: 'austin',
        number: '123',
        frequency: '1',
        lastCall: '2021/09/11'
      }
    }
  )

  const nameInput = getByDisplayValue('austin')
  const numberInput = getByDisplayValue('123')
  const frequencyInput = await findByTestId('frequency')
  // const frequencyInput = getByText('daily')
  expect(frequencyInput.props.children[1]).toBe('daily')

  await fireEvent.changeText(nameInput, 'mum')
  await fireEvent.changeText(numberInput, '22322')
  // await fireEvent.changeText(frequencyInput, 'weekly')
  // await fireEvent.change(frequencyInput, { target: { value: 7 } })
  // fireEvent.change(screen.getByRole('slider'), { target: { value: '2' } })

  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve([]))

  await fireEvent.press(getByText('Confirm'))
  expect(saveData).toHaveBeenCalled()
  expect(readData).toHaveBeenCalled()

  expect(mockNavigate).toHaveBeenCalledWith('Contact Details', {
    contact: {
      name: 'mum',
      number: '22322',
      frequency: '1',
      lastCall: '2021/09/11'
    }
  })
})
