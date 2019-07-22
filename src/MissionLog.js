import React, { Component } from 'react';
import SwipeUpDown from 'react-native-swipe-up-down';
import { StyleSheet } from 'react-native';

class MissionLog extends Component {
    render() {
        return (
            <View>
                <SwipeUpDown
                    itemMini={
                        <Text style={styles.viewMissions}>PREVIOUS MISSIONS</Text>
                    }
                    itemFull={
                        <View>
                            <Text style={styles.viewMissions}>Dummy Text</Text>
                        </View>}
                    onShowMini={() => console.log('mini')}
                    onShowFull={() => console.log('full')}
                    onMoveDown={() => console.log('down')}
                    onMoveUp={() => console.log('up')}
                    disablePressToShow={true}
                    style={{ backgroundColor: '#ecf0f1' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },

    viewMissions: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    }
})

export default MissionLog;