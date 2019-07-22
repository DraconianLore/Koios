import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
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
    fetchData()
  }

  const fetchData = async () => {
    const response = await axios.get('http://192.168.88.150:3000/users/' + userId)
    setMessage(response.data.message)
    if (response.data.message.slice(0, 3) === 'Wel') {
      setLoggedIn(true);
    }

  }


  return (
    <View style={styles.container}>
      <Header />
      {loggedIn && <TopBar/>}
      <Text style={styles.message}>{message.toUpperCase()}</Text>
      {loggedIn || <Login agentLogin={attemptLogin} />}
      <SwipeUpDown
        itemMini={
          <Text style={styles.viewMissions}>PREVIOUS MISSIONS</Text>
        }
        itemFull={
          <MissionLog userId={userId}/> 
        }
        disablePressToShow={false}
        style={{ backgroundColor: '#121212' }}
      />
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
