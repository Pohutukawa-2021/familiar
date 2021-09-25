import React from 'react'
/* eslint-disable-next-line */
import { StyleSheet, View, TextInput, Text, Pressable,ScrollView } from 'react-native'
import { styles } from './Add'
import { readData, saveData } from './helperFunc'
function Edit (props) {
  const { name, number, frequency, lastCall } = props.route.params.contact

  const [initalName, setInitalName] = React.useState(name)

  const [editForm, setEditForm] = React.useState({
    name,
    number,
    frequency,
    lastCall
  })

  function handleOnChangeEdit (name, value) {
    console.log(name, value)
    const newEditForm = {
      ...editForm,
      [name]: value
    }
    setEditForm(newEditForm)
  }

  async function handlePressEdit () {
    const { name, number, frequency, lastCall } = editForm
    const contact = { name, number, frequency, lastCall }

    const data = await readData()

    const newData = data.map(value => {
      if (value.name === initalName) {
        const newValue = { name, number, frequency, lastCall }
        return newValue
      } else return value
    })

    saveData(newData)
    props.navigation.navigate('Contact Details', { contact })
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.innerContainer}>
          <Text style={styles.h1}>Edit</Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={editForm.name}
            placeholder='name'
            keyboardType="default"
            onChangeText={(value) => handleOnChangeEdit('name', value)}
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={editForm.number}
            placeholder='number'
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangeEdit('number', value)}
          />
          <Text style={styles.label}>Frequency</Text>
          <TextInput
            style={styles.input}
            value={editForm.frequency}
            placeholder='frequency'
            keyboardType="default"
            onChangeText={(value) => handleOnChangeEdit('frequency', value)}
          />
          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={handlePressEdit}>
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default Edit
