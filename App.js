import { AppRegistry, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from 'react-native-dotenv';
import axios from 'axios';
import SwipeUpDown from 'react-native-swipe-up-down';
import MissionLog from './src/MissionLog';
import Header from './src/Header';
import Login from './src/Login';
import TopBar from './src/TopBar';
import Main from './src/Main';
import Constants from 'expo-constants';



export default function App() {
  const [message, setMessage] = useState("")
  const [userId, setUserId] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [experience, setExperience] = useState(0)
  const [rank, setRank] = useState(0)

  function attemptLogin(agentId) {
    setUserId(agentId)
  }

  useEffect( () => {
    if (userId) {
      


      // Swap out manual ID entry to restrict each device to a single account
      // const response = axios.get(`${BASE_URL}:3000/users/` + Constants.installationId).then(response => {


        // Using manual ID entry for DEMO purposes
      const response = axios.get(`${BASE_URL}:3000/users/` + userId).then(response => {

        setMessage(response.data.message)
        if (response.data.message.slice(0, 3) === 'Wel') {
          setLoggedIn(true);
          setExperience(response.data.experience / 10);
          setRank(response.data.rank);
        }

      })
    }
  }, [userId])

  function updateExp(exp) {
    setExperience(exp / 10);
  }

  function updateRank(rank) {
    setRank(rank);
  }


  return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/images/background.png')}
        style={{width: '100%', height: '100%'}}>
          <Header/>
          {loggedIn && <TopBar exp={experience} rank={rank} />}
          <Text style={styles.message}>{message.toUpperCase()}</Text>
          {loggedIn && <Main userId={userId} updateExp={updateExp} updateRank={updateRank}/>}
          {loggedIn || <Login agentLogin={attemptLogin} />}
          {loggedIn && <SwipeUpDown
            itemMini={
              <Text style={styles.viewMissions}>P R E V I O U S  M I S S I O N S</Text>
            }
            itemFull={
              <MissionLog userId={userId} />
            }
            disablePressToShow={false}
            style={{ backgroundColor: '#000'}}
            animation="linear"
            />}
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  message: {
    textAlign: "center",
    color: '#ababab',
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 10,
    fontWeight: '300'
  },
  viewMissions: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ccc',
    backgroundColor: 'transparent',
    fontStyle: 'italic'
  }
});

AppRegistry.registerComponent('myproject', () => App)