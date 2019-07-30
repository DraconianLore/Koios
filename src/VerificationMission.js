import React from 'react';
import { StyleSheet, Image, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { BASE_URL } from 'react-native-dotenv';
export default class VerificationMission extends React.Component {
    constructor(props) {
        super(props)
        this.responseNo = this.responseNo.bind(this)
        this.responseYes = this.responseYes.bind(this)
    }
    responseNo = () => {
        axios.put(`https://koios.herokuapp.com/users/` + this.props.userId + '/missions/verify').then(response => {
            this.props.setMissionComplete()
        })
    }
    responseYes = () => {
        axios.put(`https://koios.herokuapp.com/users/` + this.props.userId + '/missions/verify').then(response => {
            this.props.setMissionComplete()
        })
    }
    render() {
        
        return (
            <View style={styles.verification}>
                <View style={styles.image}>
                    <Image source={{ uri: this.props.vPhoto}} style={{ height: '90%', width: '100%' }} />
                    <View>
                        <TouchableOpacity onPress={this.responseNo} style={styles.answerNo}><Text style={styles.buttons}>NO</Text></TouchableOpacity>
                        <Text style={styles.caption}>{`${this.props.missionDescription}\n`}</Text>
                        <TouchableOpacity onPress={this.responseYes} style={styles.answerYes}><Text style={styles.buttons}>YES</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    verification: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    image: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 2
    },
    caption: {
        zIndex: 4,
        position: "absolute",
        bottom: 220,
        alignSelf: "center",
        textAlign: "center",
        backgroundColor: '#660000',
        color: '#f5e653',
        borderRadius: 5,
        padding: 2
    },
    answerNo: {
        backgroundColor: '#330000',
        position: "absolute",
        bottom: 220,
        left: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    answerYes: {
        backgroundColor: '#003300',
        position: "absolute",
        bottom: 220,
        right: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50

    },
    buttons: {
        textAlign: "center",
        color: '#f5e653',
    }
})