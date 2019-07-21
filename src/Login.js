import React from 'react';

import { StyleSheet, View, TextInput, Keyboard, Button } from 'react-native';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { agentId: "" };
        this.sendAgentId = this.sendAgentId.bind(this)
    }

    sendAgentId = () => {
        console.log(this.state.agentId)
        this.props.agentLogin(this.state.agentId)

    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Agent ID"
                    maxLength={2}
                    name="agInput"
                    keyboardType={"number-pad"}
                    onBlur={Keyboard.dismiss}
                    onSubmitEditing={this.sendAgentId}
                    onChangeText={(agentId) => this.setState({agentId})}
                    value={this.state.agentId}
                />
                <Button
                    onPress={this.sendAgentId}
                    title="Submit"
                    accessibilityLabel = "do a press"
                    color='#990000'
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        textAlign: "center",
        fontSize: 30,
        color: '#eee',
        backgroundColor: '#aaa'
    },
});

export default Login;
