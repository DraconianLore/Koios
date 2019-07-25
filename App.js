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


export default function App() {
  const [message, setMessage] = useState("")
  const [userId, setUserId] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  function attemptLogin(agentId) {
    setUserId(agentId)
  }

  useEffect( () => {
    if (userId) {
      const response = axios.get(`${BASE_URL}:3000/users/` + userId).then(response => {

        setMessage(response.data.message)
        if (response.data.message.slice(0, 3) === 'Wel') {
          setLoggedIn(true);
        }

      })
    }
  }, [userId])





  return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/images/background.jpg')}
        style={{width: '100%', height: '100%'}}>
        <Header />
        {loggedIn && <TopBar />}
        {loggedIn && <Main userId={userId}/>}
        <Text style={styles.message}>{message.toUpperCase()}</Text>
        {loggedIn || <Login agentLogin={attemptLogin} />}
        {loggedIn && <SwipeUpDown
          itemMini={
            <Text style={styles.viewMissions}>PREVIOUS MISSIONS</Text>
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
    color: '#990000',
    fontWeight: "bold",
    marginBottom: 20,
  },
  viewMissions: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#CCCCCC',
    fontStyle: 'italic'
  }
});

AppRegistry.registerComponent('myproject', () => App)