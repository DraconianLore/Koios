import React from 'react';
import TopBar from './TopBar';
import Log from './Log;'

import { StyleSheet, View, Button } from 'react-native';

export default function Main() {
    return (
        <View>
            <TopBar />
            <Button
                title="New Mission"
                color='#B4CDCD'
            />
            <Log/>
        </View>
    )
}