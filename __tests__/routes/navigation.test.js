import React from 'react'
import { fireEvent, render, act, cleanup } from '@testing-library/react-native'
// import { act } from 'react-dom/test-utils'
// import { act } from '@testing-library/react-hooks'

import { saveData, readData } from '../../helpers/helperFunc'
import StackNavigation from '../../routes/Navigation'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
jest.mock('../../helpers/helperFunc')

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)

test('Displays the home screen when first loads', async () => {
  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve([]))

  const component = StackNavigation()

  const { findByText } = render(component)
  await act(async () => {
    const addContactText = await findByText('familiar')
    expect(addContactText).toBeTruthy()
  })
})

test('Should navigate to contactDetails when a card is clicked', async () => {
  const data = {
    name: 'Mum',
    lastCall: '2021-09-20T23:11:17+12:00'
  }
  saveData.mockImplementation(() => Promise.resolve())
  readData.mockImplementation(() => Promise.resolve([data]))

  const component = StackNavigation()
  const { findByText, getByText } = render(component)

  await act(async () => {
    const firstCard = await findByText(data.name)
    await fireEvent.press(firstCard)
    const editTitle = getByText('edit')
    expect(editTitle).toBeTruthy()
  })
})
