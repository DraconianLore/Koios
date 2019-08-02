import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';
import { StyleSheet, View, TextInput, Button, Text, ImageBackground, TouchableOpacity} from 'react-native';
import PhotoMission from './PhotoMission';
import VerificationMission from './VerificationMission';
import MissionComplete from './MissionComplete';

export default class MissionView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId: props.userId,
      answer: '',
      response: '',
      instructionButton: "VIEW INSTRUCTIONS",
      missionType: props.missionType,
      missionActive: props.missionActive,
      missionComplete: false
    }
    this.completeAMission = this.completeAMission.bind(this)
  }

  buttonPress = () => {
    const response = axios.patch(`${BASE_URL}users/` + this.state.userId + '/missions/verify?message=' + this.state.answer).then(response => {
     
      if (response.data.message === 'MISSION COMPLETE') {
        
        this.setState({ response: response.data.message})
        setTimeout(() => {
          this.completeAMission()
        }, 10);
        
      } else {
        this.setState({
          response: response.data.message
        })
      }
    })
  }
  
  completeAMission = () => {
    this.setState({
      missionType: '',
      missionComplete: true
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
        {this.state.missionType === 'cypher' && <ImageBackground source={require('../assets/images/missionView.jpg')}
        style={{width: '100%', height: '100%'}}>
          <Text style={styles.textCol}>{this.props.missionInfo}</Text>
          <Text style={styles.invalid}>{this.state.response}</Text>
          <TouchableOpacity onPress={showInstructions} style={styles.instructions}>
            <Text style={styles.instructions}>{this.state.instructionButton}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="INPUT YOUR ANSWER"
            placeholderTextColor='#666'
            multiline={true}
            editable = {true}
            numberOfLines = {4}
            onChangeText={(answer) => this.setState({answer})}
          />
          <Button 
            title = 'SUBMIT'
            onPress={this.buttonPress}
            color='#730000'
          />
        </ImageBackground>}
        {this.state.missionType === 'photo' && <PhotoMission missionDescription={this.props.missionDescription} userId={this.props.userId} missionInfo={this.props.missionInfo} setMissionComplete={this.completeAMission} />}
        {this.state.missionType === 'verification' && <VerificationMission userId={this.props.userId} missionDescription={this.props.missionDescription} vPhoto={this.props.vImage} userId={this.props.userId} setMissionComplete={this.completeAMission} />}
        {this.state.missionComplete && <MissionComplete setMissionComplete={this.props.setMissionComplete} />}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  mission: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#eee',
  },
  textCol: {
    color: '#b0b0b0',
    textAlign: 'center',
    padding: 20,
    fontSize: 15,
  },
  invalid: {
    color: '#ff0000',
    textAlign: 'center',
    padding: 10,
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
    textAlign: 'center',
    opacity: 0.7,
    color: '#cccccc'
  },
  instructions: {
    color: '#b0b0b0',
    textAlign: 'center',
    padding: 5,
  }
})