import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0)
  const [message, setMessage] = useState("YOU NEED TO PRESS!")

  const fetchData = async () => {
    const response = await axios.get('http://192.168.88.104:3000/users')
    setMessage(response.data.message)
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button
        onPress={fetchData}
        title="Click"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
