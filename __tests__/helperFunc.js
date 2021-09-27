import AsyncStorage from '@react-native-async-storage/async-storage'

import { color, saveData, readData, clear, STORAGE_KEY } from '../helpers/helperFunc'

describe('Color returns the correct color', () => {
  it('returns green when difference is less than frequency', () => {
    const difference = 1
    const frequency = 2
    expect(color(difference, frequency)).toBe('#5AF160')
  })

  it('returns orange when difference is same as frequency', () => {
    const difference = 2
    const frequency = 2
    expect(color(difference, frequency)).toBe('#FF971D')
  })

  it('returns orange when difference is the same as 2*frequency', () => {
    const difference = 4
    const frequency = 2
    expect(color(difference, frequency)).toBe('#FF971D')
  })

  it('color returns red when difference is greater than 2*frequency', () => {
    const difference = 5
    const frequency = 2
    expect(color(difference, frequency)).toBe('#E00000')
  })
})

describe('Async storage, can save read and clear data', () => {
  jest.mock('../helpers/helperFunc')
  // jest.mock('AsyncStorage')

  beforeEach(async () => await AsyncStorage.clear())
  const dummyData = [
    {
      name: 'Dad',
      number: '021-1234567',
      frequency: '7',
      lastCall: '2021-09-20T23:11:17+12:00'
    },
    {
      name: 'Mum',
      number: '021-9876567',
      frequency: '3',
      lastCall: '2021-09-11T23:11:17+12:00'
    },
    {
      name: 'Austin',
      number: '021-1235358',
      frequency: '14',
      lastCall: '2021-09-09T23:11:17+12:00'
    },
    {
      name: 'Ali',
      number: '021-1256778',
      frequency: '30',
      lastCall: '2020-09-20T23:11:17+12:00'
    }
  ]
  const fakeDummyData = [
    {
      name: 'Dad',
      number: '021-1234567',
      frequency: '7',
      lastCall: '2021-09-20T23:11:17+12:00'
    }
  ]

  it('saveData should update the async storage', async () => {
    await saveData(dummyData)
    const actual = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
    expect(actual).toEqual(dummyData)
    expect(actual).not.toEqual(fakeDummyData)
  })

  it('readData should obtain all the data', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))
    expect(await readData()).toEqual(dummyData)
    expect(await readData()).not.toEqual(fakeDummyData)
  })

  it('clear, should remove everything from async storage', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))
    await clear()
    const actual = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
    expect(actual).toBeNull()
  })
})
