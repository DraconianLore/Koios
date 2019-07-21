import React from 'react';

import { StyleSheet, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.topBar}>
            </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        height: 20,
        backgroundColor: '#333333',
    },
});
