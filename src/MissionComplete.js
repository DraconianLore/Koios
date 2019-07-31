import React from 'react';
import { StyleSheet, Image, View, Text, Dimensions, TouchableOpacity } from 'react-native';

export default class MissionComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blink: false
        }
        timer = null;
    }
componentDidMount() {
    timer = setInterval(() => {
        this.setState(previousState => (
            { blink: !previousState.blink }
        ))
    }, 900);
}
componentWillUnmount() {
    clearInterval(timer)
}
    continue = () => {
        this.props.setMissionComplete()
    }
    render() {

        return (
            <View style={styles.fullScreen}>
                {this.state.blink && <View style={styles.missionCompleteBox}>
                    <Text style={styles.missionComplete}>
                        MISSION
                    </Text>
                    <Text style={styles.missionComplete}>
                        COMPLETE
                    </Text>
                </View>}
                {this.state.blink || <View style={styles.missionCompleteBox}>
                    <Text style={styles.missionCompleteDim}>
                        MISSION
                    </Text>
                    <Text style={styles.missionCompleteDim}>
                        COMPLETE
                    </Text>
                </View>}
                
                <TouchableOpacity onPress={this.continue}>
                    <Text style={styles.okButton}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    fullScreen: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 6
    },
    missionComplete: {
        fontSize: 40,
        color: '#aa0000',
        alignSelf: "center",
        fontWeight: "bold"
    },    
    missionCompleteDim: {
        fontSize: 40,
        color: '#660000',
        alignSelf: "center",
        fontWeight: "bold",
        opacity: 0.8
    },
    missionCompleteBox: {
        paddingBottom: 50
    },
    okButton: {
        textAlign: "center",
        color: '#009900',
        backgroundColor: '#003300',
        alignItems: "center",
        fontSize: 22,
        padding: 10,
        borderWidth: 3,
        justifyContent: "center",
        shadowColor: '#003800',
        shadowRadius: 10,
        shadowOpacity: 1,
        borderColor: '#40ff53',
        shadowOffset: { height: 3, width: 2 },
        marginTop: 50
    }
})