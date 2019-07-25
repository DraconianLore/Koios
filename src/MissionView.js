import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';
import { StyleSheet, View, TextInput, Button, Text, ImageBackground} from 'react-native';

export default class MissionView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId: props.userId,
      answer: "",
      response: ""
    }
  }

  buttonPress = () => {
    const response = axios.patch(`${BASE_URL}:3000/users/` + this.state.userId + '/missions/verify?message=' + this.state.answer).then(response => {
      this.setState({
        response: response.data.message
      })
    })
  }

  render() {
    return (
      
      <View style={styles.mission}>
      <ImageBackground source={require('../assets/images/matrix.gif')}
      style={{width: '100%', height: '100%'}}>
        <Text style={styles.textCol}>{this.state.response}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="INPUT YOUR ANSWER"
          multiline={true}
          editable = {true}
          numberOfLines = {4}
          onChangeText={(answer) => this.setState({answer})}
        />
        <Button 
          title = 'SUBMIT'
          onPress={this.buttonPress}
        />
         {/* form submit puts/patch to update to do verification
        rake routes to find route  */}
                  </ImageBackground>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  mission: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    backgroundColor: '#000000',
    opacity: 0.7
  },
  textCol: {
    color: '#fff',
    height: 200
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 100,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#000000',
    opacity: 0.7,
    color: '#cccccc'
  }
})