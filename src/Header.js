import React from 'react';

import { StatusBar, View } from 'react-native';

export default function Header() {
    return (
        <View style={{ height: 20, backgroundColor: '#121212' }}>
            <StatusBar barStyle="light-content"/>
        </View>
    );
}