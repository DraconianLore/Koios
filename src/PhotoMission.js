import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import React from 'react';
import { StyleSheet, Image, View, Text, Dimensions, Button, TouchableOpacity } from 'react-native';
import CamButtons from './CamButtons';

export default class PhotoMission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            captures: [],
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            cameraOpen: false,
            showInstructions: false,
            showImage: false,
            camButton: true
        };
        this.showInfo = this.showInfo.bind(this)
    }
setCameraType = (cameraType) => this.setState({type: cameraType})

handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({ 
        captures: [photoData, ...this.state.captures],
        cameraOpen: false,
        showImage: true,
        camButton: false,
        showInstructions: false
     })

};

    
    showInfo = () => {
        if (this.state.showInstructions) {
            this.setState({ showInstructions: false })
        } else {
            this.setState({ showInstructions: true })
        }
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    startCamera = () => {
        this.setState({ 
            cameraOpen: true,
            camButton: false
        })
    }
    render() {
        const retakeImage = () => {
            this.setState({
                captures: [],
                camButton: true,
                showImage: false
            })
        }
        const sendImage = () => {
            console.log('send photo to wherever')
        }
    
        const { hasCameraPermission, type, showImage, cameraOpen, camButton } = this.state;
       if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {

            return (
                <View style={styles.cam}>
                    {this.state.showInstructions && <View style={styles.instructions}>
                        <Text style={styles.instructionText}>{this.props.missionInfo}</Text>
                    </View>}
                    {cameraOpen && <Camera
                        style={styles.cam}
                        ref={camera => this.camera = camera}
                        type={type}
                    />}
                    {cameraOpen && <CamButtons 
                    cameraType={type}
                    setCameraType={this.setCameraType}
                    onShortCapture={this.handleShortCapture}
                    showInfo={this.showInfo}
                    />}
                    {camButton && <View style={styles.activateCamera}>
                        <Button
                        onPress={this.startCamera}
                        title="Activate Camera"
                        color='#990000'
                        />
                    </View>}
                    {showImage && <View style={styles.image}>
                        <Image source={ this.state.captures[0]} style={{height: '90%', width: '100%'}} />
                        <TouchableOpacity onPress={retakeImage} style={styles.answerNo}><Text style={styles.buttons}>NO</Text></TouchableOpacity>
                        <Text style={styles.caption}>{this.props.missionDescription}</Text>
                        <TouchableOpacity onPress={sendImage} style={styles.answerYes}><Text style={styles.buttons}>YES</Text></TouchableOpacity>
                        </View>}
                </View>

            )

        }


    }
}
const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    instructions: {
        backgroundColor: '#990000',
        width: '80%',
        alignSelf: "center",
        zIndex: 1
    },
    instructionText: {
        color: '#ccc',
        textAlign: "center"
    },
    activateCamera: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    cam: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }, 
     image: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 2
    },
    caption: {
        zIndex: 4,
        position: "absolute",
        bottom: 220,
        alignSelf: "center",
        textAlign: "center",
        backgroundColor: '#660000',
        color: '#f5e653'
    },
    answerNo: {
        backgroundColor: '#330000',
        position: "absolute",
        bottom: 220,
        left: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    answerYes: {
        backgroundColor: '#003300',
        position: "absolute",
        bottom: 220,
        right: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center"

    },
    buttons: {
        textAlign: "center",
        color: '#f5e653',
    }
}
)