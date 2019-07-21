import React from 'react';

import { StyleSheet, View, TextInput, Keyboard } from 'react-native';

export default function Login(poops) {
    
    const sendAgentId = (e) => {

        poops.agentLogin(e.nativeEvent.text)

    }

    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholder="Agent ID"
                maxLength={2}
                name="agInput"
                keyboardType={"number-pad"}
                onBlur={Keyboard.dismiss}
                onSubmitEditing={sendAgentId}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        textAlign: "center",
        fontSize: 30,
        color: '#fff'
    },
});
