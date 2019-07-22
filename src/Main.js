import React from 'react';
import TopBar from './TopBar';
import MissionLog from './MissionLog';

import { StyleSheet, View, Button } from 'react-native';

export default function Main() {
    return (
        <View>
            <TopBar />
            <Button
                title="New Mission"
                color='#B4CDCD'
            />
            <MissionLog/>
        </View>
    )
}