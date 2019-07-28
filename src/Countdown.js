import React from 'react';

import TimeBlink from './TimeBlink';

import { View, Text, StyleSheet } from 'react-native';

export default class Countdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        time: {},
        seconds: props.timeLeft,
        outOfTime: false
      };

      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      
  
      let obj = {
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }
  
    startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds == 0) { 
        clearInterval(this.timer);
        this.props.timesUp();
        this.setState({outOfTime: true})
      }
    }
  
    render() {
      this.startTimer()
      return(
        <View style={styles.countdownBox}>
          <View style={styles.timeBox}>
          {this.state.outOfTime || <Text style={styles.countDown}>{this.state.time.m}:{this.state.time.s}</Text>}
          {this.state.outOfTime && <TimeBlink />}
          </View>
          <Text style={styles.timerTitle}>
            TIME REMAINING
          </Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  timerTitle: {
      color: '#a9b9c2',    
      textAlign: "center",
      shadowColor: '#000',
      fontWeight: '200',
      shadowRadius: 10,
      shadowOpacity: 1
  },
  timeBox: {
    height: 100,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1
  },
  countDown: {
    color: '#990000',
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center"
  },
  countdownBox: {
    padding: 10
  }
})
