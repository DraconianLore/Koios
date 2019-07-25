import React from 'react';
import { Text, StyleSheet } from 'react-native';


export default class TimeBlink extends React.Component {
    constructor() {
        super();
        this.state = {
            blink: false
        }
        timer = null;
    }
    componentDidMount() {
       timer = setInterval(() => (
            this.setState(previousState => (
              { blink: !previousState.blink }
            ))
          ), 1000);

    }
    componentWillUnmount() {
        clearInterval(timer)
    }


    render() {
        if (!this.state.blink) {
          return (
            <Text style={styles.zerosDim}>00:00</Text>
          )
        }
    
        return (
          <Text style={styles.zeros}>00:00</Text>
        );
      }
}
const styles = StyleSheet.create({

  zeros: {
    color: '#990000',
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center"
  },
  zerosDim: {
    color: '#990000',
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 0.3
  },
})