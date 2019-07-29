import React from 'react';
import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv'


import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';


class MissionLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            message: [],
        };
    }

    componentDidMount() {
        const fetchData = async () => {
            const response = await axios.get(`${BASE_URL}:3000/users/${this.state.userId}/missions`,
            );
            this.setState({ message: response.data.message });
        };
        fetchData();
    }

    render() {
        const missions = this.state.message.map((mission) => {
            let typeImage = require('../assets/images/gold.png')
            let stamp = require('../assets/images/eye.png')
            let colour = '#380000'
            switch (mission.type) {
                case 'photo':
                    typeImage = require('../assets/images/photo.png')
                    break;
                case 'encryption':
                case 'decryption':
                    typeImage = require('../assets/images/cipher.png')
                    break;
            }

            if (mission.result != 'FAILED') {
                colour = '#003800'
            }

            switch (mission.result) {
                case 'FAILED':
                    stamp = require('../assets/images/fail.png')
                    break;
                case 'COMPLETE':
                    stamp = require('../assets/images/pass.png')
                    break;
                default: 
            }
            
            const styles = StyleSheet.create({
                result: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    flexDirection: 'row',
                    padding: 8,
                    margin: 8,
                    height: 70,
                    borderWidth: 3,
                    borderColor: '#424242',
                    backgroundColor: '#141414',
                    shadowColor: colour,
                    shadowRadius: 5,
                    shadowOpacity: 1,
                    shadowOffset: {height: 3, width: 2}
                },
                photo: {
                    width: 30,
                    height: 30
                },
                resultPart: {
                    color: '#b0b0b0',
                },
                stampImg: {
                    width: 30,
                    height: 30,
                    alignItems: 'center'
                }
            })
            
            return (
                <View key={mission.id} style={styles.result}>
                    <Image style={styles.photo} source={typeImage} />
                    <Text style={styles.resultPart}>{mission.difficulty}</Text>
                    <Text style={styles.resultPart}>{mission.completed} ago</Text>
                    <Image style={styles.stampImg} source={stamp}/>
                </View>

            )
                
        })
        return (
            <ImageBackground source={require('../assets/images/missionlist.jpg')}
            style={{width: '100%', height: '100%'}}>
                <View>{missions}</View>
            </ImageBackground>
        )
    }
}

export default MissionLog;