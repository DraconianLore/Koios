import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';
import { StyleSheet, View, TextInput, Button, Text, ImageBackground, TouchableOpacity} from 'react-native';

export default class MissionView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId: props.userId,
      answer: '',
      response: '',
      instructionButton: "VIEW INSTRUCTIONS"
    }
  }

  buttonPress = () => {
    const response = axios.patch(`${BASE_URL}:3000/users/` + this.state.userId + '/missions/verify?message=' + this.state.answer).then(response => {
      this.setState({
        response: response.data.message
      })
      console.log(response.data.message)
      if (response.data.message === 'MISSION COMPLETE') {
        // const response = axios.get(`${BASE_URL}:3000/users/` + userId).then(response => {
        // })
        this.props.setMissionComplete()
     
      }
    })
  }


  
  render() {

    showInstructions = () => {
      if (this.state.instructionButton === this.props.missionDescription) {
        this.setState({
          instructionButton: "VIEW INSTRUCTIONS"
        })
      } else {
        this.setState({
          instructionButton: this.props.missionDescription
        })
      }
    }

    return (
      
      <View style={styles.mission}>
        <ImageBackground source={require('../assets/images/matrix.gif')}
        style={{width: '100%', height: '100%'}}>
          <Text style={styles.textCol}>{this.state.response}</Text>
          <Text style={styles.textCol}>{this.props.missionInfo}</Text>
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
          <TouchableOpacity onPress={showInstructions} style={styles.instructions}>
            <Text style={styles.textCol}>{this.state.instructionButton}</Text>
          </TouchableOpacity>
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
    backgroundColor: '#eee',
    opacity: 0.7
  },
  textCol: {
    color: '#fff',
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