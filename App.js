import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './src/Header';
import Login from './src/Login';
import Main from './src/Main';

export default function App() {
  const [message, setMessage] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  let userId = ''
  function attemptLogin(agentId) {
    userId = agentId
    fetchData()
  }

  const fetchData = async () => {
    const response = await axios.get('http://192.168.88.150:3000/users/' + userId)
    setMessage(response.data.message)
    if (response.data.message.slice(0,3) === 'Wel') {
      setLoggedIn(true);
    }

  }


  return (
      <View style={styles.container}>
      <Header />
        {loggedIn && <Main/>}
        <Text style={styles.message}>{message.toUpperCase()}</Text>
        {loggedIn || <Login agentLogin={attemptLogin}/>}
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
  }
});
