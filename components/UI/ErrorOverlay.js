import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function ErrorOverlay({message, confirm}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Some Error Occured!</Text>
      <Text>{message}</Text>
      <Button title='OK' onPress={confirm}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:16,
        fontWeight: 'bold',
    }
})