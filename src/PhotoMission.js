import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import React from 'react';
import { StyleSheet, Image, View, Text, Dimensions, Button, TouchableOpacity } from 'react-native';
import CamButtons from './CamButtons';
import uploadImage from './uploadImage'
export default class PhotoMission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            captures: [],
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            cameraOpen: false,
            showInstructions: false,
            showImage: false,
            camButton: true,
            plsWait: false,
            uploading: false
        };
        this.showInfo = this.showInfo.bind(this)
    }
    setCameraType = (cameraType) => this.setState({ type: cameraType })
    handleShortCapture = async () => {
       
        this.setState({ plsWait: true })
        const photoData = await this.camera.takePictureAsync();
        this.setState({
            captures: [photoData, ...this.state.captures],
            cameraOpen: false,
            showImage: true,
            camButton: false,
            showInstructions: false,
            plsWait: false
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
            let image = this.state.captures[0]
            this.setState({ uploading: true })
            uploadImage(image.uri, this.state.userId, (res) => {
                this.setState({uploading: false})
                this.props.setMissionComplete()

            })
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
                    {this.state.plsWait && <Image style={styles.wait} source={require('../assets/images/loading.gif')}/>}
                    {this.state.uploading && <Image style={styles.wait} source={require('../assets/images/loading.gif')}/>}
                    {cameraOpen && <CamButtons
                        cameraType={type}
                        setCameraType={this.setCameraType}
                        onShortCapture={this.handleShortCapture}
                        showInfo={this.showInfo}
                    />}
                    {camButton && <View style={styles.activateCamera}>
                       <Image style={styles.camPng} source={require('../assets/images/camera.png')} />
                       <Button
                           onPress={this.startCamera}
                           title="ACTIVATE CAMERA"
                           color='#700000'
                       />
                   </View>}
                    {showImage && <View style={styles.image}>
                        <Image source={this.state.captures[0]} style={{ height: '100%', width: '100%' }} />
                        {this.state.uploading || <View>
                            <TouchableOpacity onPress={retakeImage} style={styles.answerNo}><Text style={styles.noBtn}>NO</Text></TouchableOpacity>
                            <Text style={styles.caption}>{`${this.props.missionDescription}\n`}</Text>
                            <TouchableOpacity onPress={sendImage} style={styles.answerYes}><Text style={styles.yesBtn}>YES</Text></TouchableOpacity>
                        </View>}
                    </View>}
                </View>
            )
        }
    }
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
    instructions: {
        backgroundColor: '#000',
        width: '100%',
        padding: 10,
        opacity: 0.7,
        marginTop: 5,
        alignSelf: "center",
        zIndex: 1
    },
    wait: {
        position: "absolute",
        bottom: '40%',
        left: '40%',
        height: 100,
        width: 100,
        zIndex: 4,
        padding: 5
    },
    instructionText: {
        color: '#ccc',
        textAlign: "center"
    },
    activateCamera: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: '#565a5e'
    },
    camPng: {
        height: 250,
        width: 250,
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
        bottom: 440,
        width: '100%',
        padding: 10,
        color: '#f0f0f0',
        overflow: 'hidden',
        alignSelf: "center",
        textAlign: "center",
        position: "absolute",
        borderWidth: 5,
        borderColor: '#171717',
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1,
        opacity: 0.7,
    },
    answerNo: {
        left: 20,
        width: 50,
        height: 50,
        bottom: 70,
        borderWidth: 2,
        borderColor: '#ff3333',
        shadowColor: '#380000',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 0},
        position: "absolute",
        alignItems: "center",
        backgroundColor: '#000',
        justifyContent: "center",
    },
    answerYes: {
        right: 20,
        width: 50,
        height: 50,
        bottom: 70,
        borderWidth: 2,
        borderColor: '#40ff53',
        shadowColor: '#003800',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 0},
        position: "absolute",
        alignItems: "center",
        backgroundColor: '#000',
        justifyContent: "center",

    },
    yesBtn: {
        textAlign: "center",
        color: '#40ff53',
    },
    noBtn: {
        textAlign: 'center',
        color: '#ff3333',
    }
})