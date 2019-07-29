import React from 'react';
import axios from 'axios';
import Countdown from './Countdown';
import Swiper from 'react-native-swiper';
import MissionView from './MissionView';
import { BASE_URL } from 'react-native-dotenv';


import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            missionAvailable: false,
            missionActive: false,
            mButtonText: 'NO MISSIONS AVAILABLE',
            bBorderColor: '#424242',
            bShadowColor: '#000',
            bTextColour: '#8a8a8a',
            missionInfo: '',
            userId: this.props.userId,
            showMission: false,
            showRejectButton: false,
            missionDescription: '',
            showTimeLeft: false,
            missionType: '',
            missionId: ''
        }
        this.outOfTime = this.outOfTime.bind(this)
        this.checkMissions = this.checkMissions.bind(this)
        this.updateMissionTo = this.updateMissionTo.bind(this)
        this.setMissionComplete = this.setMissionComplete.bind(this)
    }
    checkMissions = () => {
        const response = axios.get(`${BASE_URL}:3000/users/` + this.state.userId + '/missions/current').then(response => {
            console.log(response.data.message)
            data = response.data.message
            this.props.updateExp(response.data.experience)
            this.props.updateRank(response.data.rank)
            if (data.available) {
                this.setState({
                    missionAvailable: true,
                    mButtonText: 'NEW MISSION AVAILABLE',
                    bTextColour: '#ff3333',
                    bBorderColor: '#ff3333',
                    bShadowColor: '#380000',
                    missionInfo: `YOUR MISSION\n\nSHOULD YOU CHOOSE TO ACCEPT IT:\n\nType: ${data.mType}\nDifficulty: ${data.mDifficulty}\nTime to complete: ${data.mTime} minutes.`
                })

            } else if (data.current) {
                let mEndTime = new Date(data.endTime)
                mEndTime = (Date.parse(mEndTime) - Date.parse(new Date())) / 1000
                if (data.mType === 'photo') {
                    data.description= `Is this a picture of\n${data.title.slice(16)}\n${data.message}` 
                }
                if (data.mType === 'encryption' || data.mType === 'decryption') {
                    data.mType = 'cypher'
                }
                this.setState({
                    missionActive: true,
                    missionAvailable: false,
                    showRejectButton: false,
                    mButtonText: 'SHOW MISSION DETAILS',
                    bTextColour: '#1fdaff',
                    bBorderColor: '#1fdaff',
                    bShadowColor: '#003169',
                    missionInfo: `${data.title}:\n\n"${data.message}"`,
                    missionDescription: data.description,
                    missionTime: mEndTime,
                    showTimeLeft: true,
                    missionType: data.mType,
                    missionId: data.missionId
                });
                
            }
        } 
        )
    }
    resetPage = () => {
        this.setState({
            missionAvailable: false,
            missionActive: false,
            mButtonText: 'NO MISSIONS AVAILABLE',
            bTextColour: '#8a8a8a',
            bBorderColor: '#424242',
            bShadowColor: '#000',
            missionInfo: '',
            showMission: false,
            showRejectButton: false,
            missionDescription: '',
            showTimeLeft: false,
            missionType: ''
        })
        this.checkMissions();
    }
    updateMissionTo(status) {
        axios.get(`${BASE_URL}:3000/users/` + this.state.userId + '/missions/' + status).then(response => {
            // to be or not to be...
        })
    }
    componentDidMount() {
        this.checkMissions();
    }

    setMissionComplete = () => {
        this._swiper.scrollBy(-1)
        this.resetPage()
    }

    outOfTime = () => {
        this.setState({
            mButtonText: 'OK',
            bTextColour: '#ff7d1f',
            bBorderColor: '#ff7d1f',
            bShadowColor: '#b36500',
            missionActive: false,
            missionInfo: 'M I S S I O N  F A I L E D\n\nYOU ARE OUT OF TIME',
            showMission: true
        })
        this.updateMissionTo('failed')
    }

    render() {
        styles = StyleSheet.create({
            buttonContainer: {
                flex: 1,
                flexDirection: "column-reverse",
                alignItems: "center"
            },
            missionButton: {
                textAlign: "center",
                height: '20%',
                color: '#eee',
                backgroundColor: '#141414',
                alignItems: "center",
                width: '50%',
                borderWidth: 3,
                justifyContent: "center",
                shadowColor: this.state.bShadowColor,
                shadowRadius: 10,
                shadowOpacity: 1,
                borderColor: this.state.bBorderColor
            },
            buttonText: {
                color: this.state.bTextColour,
                textShadowColor: '#000',
                textShadowRadius: 10,
                fontSize: 20,
                fontWeight: '200',
                textAlign: "center"
            },
            missionText: {
                backgroundColor: 'rgba(18, 18, 18, 0.9)',
                borderWidth: 5,
                borderColor: '#171717',
                shadowColor: '#000',
                shadowRadius: 10,
                shadowOpacity: 1,
                opacity: 0.8,
                margin: 5,
                padding: 10,
                position: "absolute",
                top: 20,
                zIndex: 1
            },
            missionDetails: {
                color: '#fff',
                textAlign: 'center',
                fontWeight: '200'
            },
            rejectButton: {
                textAlign: "center",
                color: '#ff3333',
                backgroundColor: '#000',
                alignItems: "center",
                borderWidth: 1,
                borderColor: '#ff3333',
                shadowColor: '#70002b',
                shadowRadius: 5,
                shadowOpacity: 1,
                shadowOffset: {width: 0, height: 0},
                justifyContent: "center"
            },
            rejectText: {
                color: '#ff3333'
            },
            bottomSection: {
                marginBottom: 30,
                marginTop: 5,
                width: '30%',
                height: '10%',
            },
            clock: {
                height: 200,
                width: 250,
                shadowColor: '#000',
                shadowRadius: 10,
                shadowOpacity: 1,
                shadowOffset: {height: 10, width: 0}
            }
        });

        buttonPress = () => {

            this.setState({ showRejectButton: false })
            if (this.state.missionAvailable) {
                if (this.state.mButtonText == 'ACCEPT') {
                    this.updateMissionTo('accepted')
                    setTimeout(() => {
                        this.checkMissions();
                    }, 500);
                } else {
                    this.setState({
                        showMission: true,
                        mButtonText: 'ACCEPT',
                        bTextColour: '#40ff53',
                        bBorderColor: '#40ff53',
                        bShadowColor: '#003800',
                        showRejectButton: true
                    })

                }
            } else if (this.state.missionActive) {
                if (this.state.showMission) {
                    this.setState({
                        showMission: false
                    })
                } else {
                    this.setState({
                        showMission: true
                    })
                }
            } else if (this.state.showTimeLeft) {
                this.resetPage();
            } else {

                setTimeout(() => { this.checkMissions() }, 500)
            }
        }
        rejectPress = () => {
            this.updateMissionTo('rejected');
            setTimeout(() => {
                this.resetPage();
            }, 500);
        }

        newMission = () => {
            if (!this.state.missionActive && !this.state.missionAvailable) {
                this.updateMissionTo('new')
            }
            setTimeout(() => {
                this.checkMissions()
            }, 500);
        }

        return (
            <Swiper ref={(swiper) => { this._swiper = swiper; }} showsButtons={false} loop={false} showsPagination={false}>
                <View style={styles.buttonContainer}>
                    <View style={styles.bottomSection}>
                        {this.state.showRejectButton && <TouchableOpacity onPress={rejectPress} style={styles.rejectButton}>
                            <View>
                                <Text style={styles.rejectText}>DECLINE</Text>
                            </View>
                        </TouchableOpacity>}
                    </View>
                    <TouchableOpacity onPress={buttonPress} style={styles.missionButton}>
                        <View>
                            <Text style={styles.buttonText}>{this.state.mButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.showMission && <View style={styles.missionText}>
                        <Text style={styles.missionDetails}>
                            {this.state.missionInfo}
                        </Text>
                    </View>}
                    {this.state.showTimeLeft && <Countdown timeLeft={this.state.missionTime} timesUp={this.outOfTime} />}
                    {this.state.showTimeLeft && <Image source={require('../assets/images/clock.gif')} style={styles.clock}/> }
                    {this.state.showTimeLeft || <View style={{ height: 140 }} />}
                    {this.state.showTimeLeft || <TouchableOpacity onPress={newMission}><Image source={require('../assets/images/eye.png')} style={styles.clock}/></TouchableOpacity>}
                </View>
                {this.state.missionActive && <MissionView
                    missionType={this.state.missionType}
                    userId={this.state.userId}
                    missionInfo={this.state.missionInfo}
                    missionDescription={this.state.missionDescription}
                    setMissionComplete={this.setMissionComplete}
                    missionActive={this.state.missionActive}
                />}
            </Swiper>
        )
    }
}


