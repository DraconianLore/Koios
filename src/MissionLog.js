import React from 'react';
import axios from 'axios';

import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';

class MissionLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            message: []
        };
    }

    componentDidMount() {
        const fetchData = async () => {
            const response = await axios.get(`http://192.168.88.183:3000/users/${this.props.userId}/missions`,
            );
            this.setState({ message: response.data.message });
        };
        fetchData();
    }

    render() {
        const missions = this.state.message.map((mission) => {

            console.log(mission)
            let typeImage =  '' 
            let colour = '#ff0000'
            switch (mission.type) {
                case 'photo':
                    typeImage = require('./images/photo.png')
                    break;
                case 'encryption':
                case 'decryption':
                    // logicalExpression
                    break;
            }
            if (mission.result != 'FAILED') {
                colour = '#00ff00'
            }
            
            const styles = StyleSheet.create({
                result: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                    flexDirection: 'row',
                    margin: 10,
                    height: 70,
                    borderWidth: 1,
                    borderColor: colour,
                },
                photo: {
                    width: 30,
                    height: 30
                },
                difficult: {
                    color: '#aaa',
                    
                },
                complete: {
                    color: '#aaa'
                },
                solution: {
                    color: '#aaa'
                }
            })
            
            return (
                <View key={mission.id} style={styles.result}>
                    <Image style={styles.photo} source={typeImage} />
                    <Text style={styles.difficult}>{mission.difficulty}</Text>
                    <Text style={styles.complete}>{mission.completed} ago</Text>
                    <Text style={styles.solution}>{mission.result}</Text>
                </View>

            )
                
        })
        return (
            <ImageBackground source={require('./images/missionlist.jpg')}
            style={{width: '100%', height: '100%'}}>
                <View>{missions}</View>
            </ImageBackground>
        )
    }
}

export default MissionLog;