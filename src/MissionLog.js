import React from 'react';
import axios from 'axios';

import { StyleSheet, View, Text } from 'react-native';
import { logicalExpression } from '@babel/types';

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
            const response = await axios.get(`http://192.168.88.150:3000/users/${this.props.userId}/missions`,
            );
            this.setState({ message: response.data.message });
        };
        fetchData();
    }

    render() {
        const missions = this.state.message.map((mission) => {
            switch (mission.type) {
                case 'photo':
                    // logicalExpression
                    break;
                case 'encryption':
                case 'decryption':
                    // logicalExpression
                    break;
            }
            return (
                <View key={mission.id}>
                    <Text style={styles.words}>type: {mission.type} </Text>
                    <Text style={styles.words}>difficulty: {mission.difficulty}</Text>
                    <Text style={styles.words}>completed: {mission.completed}</Text>
                    <Text style={styles.words}>result: {mission.result}</Text>
                </View>

            )
        })
        return (
            <View>{missions}</View>
        )
    }
}

const styles = StyleSheet.create({
    badEnd: {
        margin: 10,
        height: 70,
        borderWidth: 1,
        borderColor: '#610000',
        color: '#eee'
    },
    goodEnd: {
        margin: 10,
        height: 70,
        borderWidth: 1,
        borderColor: '#0a3b00',
    },
    words: {
        color: '#eee'
    }
})

export default MissionLog;