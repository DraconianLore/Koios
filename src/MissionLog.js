import React from 'react';
import axios from 'axios';

import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';

class MissionLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            message: [],
            stamp: ''
        };
    }

    componentDidMount() {
        const fetchData = async () => {
            const response = await axios.get(`http://192.168.88.226:3000/users/${this.props.userId}/missions`,
            );
            this.setState({ message: response.data.message });
        };
        fetchData();
    }

    render() {
        const missions = this.state.message.map((mission) => {
            let typeImage =  ''
            let stamp = ''
            let colour = '#ff0026'
            let bgcolour = '#52001d'
            switch (mission.type) {
                case 'photo':
                    typeImage = require('../assets/images/photo.png')
                    break;
                case 'encryption':
                case 'decryption':
                    break;
            }

            if (mission.result != 'FAILED') {
                colour = '#00ffa6'
                bgcolour = '#005235'
            }

            switch (mission.result) {
                case 'FAILED':
                    stamp = require('../assets/images/fail.png')
                    break;
                case 'COMPLETE':
                    stamp = require('../assets/images/pass.png')
                    break;
            }
            
            const styles = StyleSheet.create({
                result: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    flexDirection: 'row',
                    padding: 8,
                    margin: 10,
                    height: 70,
                    borderWidth: 1,
                    borderColor: colour,
                    backgroundColor: bgcolour,
                    opacity: 0.7
                },
                photo: {
                    width: 30,
                    height: 30
                },
                resultPart: {
                    color: '#aaa',
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