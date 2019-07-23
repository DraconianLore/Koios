import React from 'react';

import { StyleSheet, View, Image } from 'react-native';

export default function TopBar() {
    return (
        <View style={styles.header}>
            <View style={styles.flexbox}>
            <Image
                source={require('./images/spud.png')}
                style={{ width: 30, height: 30}}
            />
            <View style={styles.progress}>
                <View
                    style={styles.color}
                />
                <View
                    style={styles.empty}
                />
            </View>
            <Image
                source={require('./images/kanye.png')}
                style={{ width: 30, height: 30}}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    header: {
        padding: 10,
        height: 50,
        width: '100%',
        backgroundColor: '#121212',
        borderBottomWidth: 0.5,
        borderBottomColor: '#a60000'
    },

    progress: {
        height: 5,
        backgroundColor: '#000',
        borderRadius: 10,
        width: '70%'
    },

    color: {
        height: 5,
        width: '30%',
        backgroundColor: '#ff0000',
        borderRadius: 10,
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: '#ff3d3d',
        shadowOffset: { height: 0, width: 0}
    },

    empty: {
        height: 5,
        width: '70%',
    }
})