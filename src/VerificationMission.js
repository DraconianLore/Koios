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
        axios.put(`${BASE_URL}users/` + this.props.userId + '/missions/verify').then(response => {
            this.props.setMissionComplete()
        })
    }
    responseYes = () => {
        axios.put(`${BASE_URL}users/` + this.props.userId + '/missions/verify').then(response => {
            this.props.setMissionComplete()
        })
    }
    render() {
        
        return (
            <View style={styles.verification}>
                <View style={styles.image}>
                    <Image source={{ uri: this.props.vPhoto}} style={{ height: '100%', width: '100%' }} />
                    <View>
                        <TouchableOpacity onPress={this.responseNo} style={styles.answerNo}><Text style={styles.noBtn}>NO</Text></TouchableOpacity>
                        <Text style={styles.caption}>{`${this.props.missionDescription}\n`}</Text>
                        <TouchableOpacity onPress={this.responseYes} style={styles.answerYes}><Text style={styles.yesBtn}>YES</Text></TouchableOpacity>
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
        bottom: 455,
        width: '100%',
        padding: 10,
        color: '#f0f0f0',
        overflow: 'hidden',
        alignSelf: "center",
        textAlign: "center",
        position: "absolute",
        borderWidth: 5,
        borderColor: '#171717',
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1,
        opacity: 0.7,
        // BUG - not showing too long sentences properly
    },
    answerNo: {
        left: 20,
        width: 50,
        height: 50,
        bottom: 70,
        borderWidth: 2,
        borderColor: '#ff3333',
        shadowColor: '#380000',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 0},
        position: "absolute",
        alignItems: "center",
        backgroundColor: '#000',
        justifyContent: "center",
    },
    answerYes: {
        right: 20,
        width: 50,
        height: 50,
        bottom: 70,
        borderWidth: 2,
        borderColor: '#40ff53',
        shadowColor: '#003800',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 0},
        position: "absolute",
        alignItems: "center",
        backgroundColor: '#000',
        justifyContent: "center",

    },
    yesBtn: {
        textAlign: "center",
        color: '#40ff53',
    },
    noBtn: {
        textAlign: 'center',
        color: '#ff3333',
    }
})