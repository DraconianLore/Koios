import React from 'react';

import { StyleSheet, View, TextInput, Keyboard, Button, Text } from 'react-native';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { agentId: "" };
        this.sendAgentId = this.sendAgentId.bind(this)
    }

    sendAgentId = () => {
        this.props.agentLogin(this.state.agentId)
    }

    render() {
        return (
            <View style={styles.flex}>
                <Text style={styles.header}>CONTENT CLASSIFIED{'\n'}PLEASE ENTER KOIOS AGENT ID</Text>
                <View>
                    <TextInput
                        style={styles.textInput}
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
                        title="SUBMIT"
                        accessibilityLabel = "submit button"
                        color='#a6a6a6'
                        fontWeight='200'
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        height: '100%'
    },
    header: {
        fontWeight: '200',
        fontSize: 20,
        color: '#fafafa',
        textAlign: 'center',
        backgroundColor: '#000',
        padding: 5,
        opacity: 0.8,
        marginTop: 150,
        marginBottom: 50
    },
    textInput: {
        textAlign: "center",
        fontSize: 30,
        color: '#eee',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#ff3333',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: '#ff0000',
    },
});

export default Login;
