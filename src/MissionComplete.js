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
                        M I S S I O N
                    </Text>
                    <Text style={styles.missionComplete}>
                        C O M P L E T E
                    </Text>
                </View>}
                {this.state.blink || <View style={styles.missionCompleteBox}>
                    <Text style={styles.missionCompleteDim}>
                        M I S S I O N
                    </Text>
                    <Text style={styles.missionCompleteDim}>
                        C O M P L E T E
                    </Text>
                </View>}
                
                <TouchableOpacity onPress={this.continue}>
                    <Text style={styles.okButton}>
                        CONTINUE
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
        backgroundColor: '#141414',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 6
    },
    missionComplete: {
        fontSize: 40,
        color: '#aa0000',
        alignSelf: "center",
        fontWeight: "300",
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10
    },    
    missionCompleteDim: {
        fontSize: 40,
        color: '#660000',
        alignSelf: "center",
        fontWeight: "300",
        opacity: 0.8,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10
    },
    missionCompleteBox: {
        paddingBottom: 50
    },
    okButton: {
        textAlign: "center",
        color: '#40ff53',
        backgroundColor: '#141414',
        alignItems: "center",
        borderWidth: 3,
        justifyContent: "center",
        shadowColor: '#003800',
        shadowRadius: 10,
        shadowOpacity: 1,
        borderColor: '#40ff53',
        fontSize: 20,
        padding: 40,
        marginTop: 100,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10
    }
})