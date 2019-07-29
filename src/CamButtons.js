import React from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native';

const { Type: CameraTypes } = Camera.Constants;

export default function CamButtons({
    cameraType = CameraTypes.back,
    setCameraType,
    onShortCapture,
    showInfo,
}) {
    showInformation = () => {
        showInfo()
    }
   
    return (
        <Grid style={styles.bottomToolbar}>
            <Row>
                <Col style={styles.alignCenter}>
                    <TouchableOpacity onPress={showInformation}>
                        <Ionicons
                            name="md-information-circle"
                            color="red"
                            size={30}
                        />
                    </TouchableOpacity>
                </Col>
                <Col size={2} style={styles.alignCenter}>
                    <TouchableWithoutFeedback
                        onPress={onShortCapture}>
                        <View style={styles.captureBtn}>

                        </View>
                    </TouchableWithoutFeedback>
                </Col>
                <Col style={styles.alignCenter}>
                    <TouchableOpacity onPress={() => setCameraType(
                        cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back
                    )}>
                        <Ionicons
                            name="md-reverse-camera"
                            color="red"
                            size={30}
                        />
                    </TouchableOpacity>
                </Col>
            </Row>
        </Grid>
    );
}

const styles = StyleSheet.create({
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomToolbar: {
        width: '100%',
        position: 'absolute',
        height: 100,
        bottom: 150,
        zIndex: 1
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
})