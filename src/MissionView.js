import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class MissionView extends Component {
  render() {
    return (
        <View style={styles.slide1}>
          <Text style={styles.text}>GFY</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})