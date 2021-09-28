import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEY = 'STORAGE_KEY'

// this fetches data from local storage
export async function readData () {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    return jsonValue !== null ? JSON.parse(jsonValue) : null
  } catch (e) {
    alert('failed to fetch the data from storage')
  }
}

// this adds data to local storage
export async function saveData (Data) {
  try {
    const jsonValue = JSON.stringify(Data)
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
  } catch (e) {
    alert('failed to save data to the storage')
  }
}

// this clears the local data!
export async function clear () {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log(e)
  }
}

// returns a color based on the difference of 2 dates and the frequency
export function color (difference, frequency) {
  if (difference < frequency) {
    return '#5AF160'
  } else if (difference <= frequency * 2) {
    return '#FF971D'
  } else {
    return '#E00000'
  }
}

// takes in a form object, returns custom error string
export function formCheck (form, names) {
  const { name, number, frequency } = form

  let err = ''
  if (typeof name !== 'string' || name === '') {
    err += 'Name'
  } else if (nameCheck(name, names)) {
    err += 'Name already in use'
  }
  if (isNaN(Number(number)) || number === '') {
    err === ''
      ? err += 'Number'
      : err += ', Number'
  }
  if (isNaN(Number(frequency)) || frequency === '') {
    err === ''
      ? err += 'Frequency'
      : err += ', Frequency'
  }
  return err
}

// returns true if name is already in local storage
function nameCheck (name, names) {
  let checker = false
  names.forEach(n => {
    if (n === name) {
      checker = true
    }
  })
  return checker
}

// converts the day frequency count to readable format

export function convertDays (frequencySource) {
  switch (Number(frequencySource)) {
    case 1:
      return 'daily'
    case 3:
      return 'every 3 days'
    case 7:
      return 'weekly'
    case 14:
      return 'fortnightly'
    case 28:
      return 'monthly'
    case 84:
      return 'every 3 months'
    case 168:
      return 'every 6 months'
    case 365:
      return 'yearly'
    default:
      return Number(frequencySource) + ' days'
  }
}

// convert slider values to frequency input

export function handleFreqChange (value, changeFunc) {
  switch (value) {
    case 1:
      changeFunc('frequency', 1)
      break
    case 2:
      changeFunc('frequency', 3)
      break
    case 3:
      changeFunc('frequency', 7)
      break
    case 4:
      changeFunc('frequency', 14)
      break
    case 5:
      changeFunc('frequency', 28)
      break
    case 6:
      changeFunc('frequency', 84)
      break
    case 7:
      changeFunc('frequency', 168)
      break
    case 8:
      changeFunc('frequency', 365)
      break
  }
}
