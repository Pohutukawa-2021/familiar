import React from 'react'
import { act, cleanup } from '@testing-library/react-native'
import History from '../../screens/History'
import { renderWithNavigation } from '../../jest/test-utils'
import { readData } from '../../helpers/helperFunc'

jest.mock('../../helpers/helperFunc')

afterAll(() => {
  jest.resetAllMocks()
})

afterEach(cleanup)

// when localStorage is empty home dsplays welcome message
// buttons redirect appropriatly
// right amount of cards

it('Should display 2 users', async () => {
  const mockNavigate = jest.fn()

  readData.mockImplementation(() =>
    Promise.resolve([
      { callCount: 1, name: 'Austin' },
      { callCount: 1, name: 'Ali' }
    ])
  )

  const { findByText, getByText } = renderWithNavigation(
    <History navigation={{ navigate: mockNavigate }} />,
    'stack'
  )

  await act(async () => {
    const firstUser = await findByText('Ali')
    const secondUser = getByText('Austin')
    expect(firstUser).toBeTruthy()
    expect(secondUser).toBeTruthy()
  })
})

it('Should display alternating colour for list item', async () => {
  const mockNavigate = jest.fn()

  readData.mockImplementation(() =>
    Promise.resolve([
      { callCount: 1, name: 'Austin' },
      { callCount: 1, name: 'Ali' }
    ])
  )

  const { findAllByTestId } = renderWithNavigation(
    <History navigation={{ navigate: mockNavigate }} />,
    'stack'
  )

  await act(async () => {
    const indicatorBackground = await findAllByTestId('indicator-background')
    expect(indicatorBackground[0].props.style[1].backgroundColor).toBe(
      '#E8E7E7'
    )
    expect(indicatorBackground[1].props.style[1].backgroundColor).toBe(
      '#F9F9F9'
    )
  })
})
