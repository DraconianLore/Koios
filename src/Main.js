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
            mButtonText: 'No missions available',
            bTextColour: '#000000',
            missionInfo: '',
            userId: this.props.userId,
            showMission: false,
            mainButtonColour: '#660000',
            showRejectButton: false,
            missionDescription: '',
            showTimeLeft: false
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
                    mButtonText: 'New Mission Available',
                    bTextColour: '#cc0000',
                    mainButtonColour: '#660000',
                    missionInfo: `YOUR MISSION\n\nSHOULD YOU CHOOSE TO ACCEPT IT:\n\nType: ${data.mType}\nDifficulty: ${data.mDifficulty}\nTime to complete: ${data.mTime} minutes.`
                })

            } else if (data.current) {
                let mEndTime = new Date(data.endTime)
                // mEndTime = mEndTime.getTime()
                mEndTime = (Date.parse(mEndTime) - Date.parse(new Date())) /1000
                this.setState({
                    missionActive: true,
                    missionAvailable: false,
                    showRejectButton: false,
                    mButtonText: 'Show Mission Details',
                    bTextColour: '#996600',
                    mainButtonColour: '#000066',
                    missionInfo: `${data.title}:\n\n"${data.message}"`,
                    missionDescription: data.description,
                    missionTime: mEndTime,
                    showTimeLeft: true
                })
            }
        })
    }
    resetPage = () => {
        this.setState({
            missionAvailable: false,
            missionActive: false,
            mButtonText: 'No missions available',
            bTextColour: '#000000',
            missionInfo: '',
            showMission: false,
            mainButtonColour: '#660000',
            showRejectButton: false,
            missionDescription: '',
            showTimeLeft: false
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
            missionActive: false,
            missionInfo: 'MISSION FAILED\n\nYou ran out of time!',
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
                backgroundColor: this.state.mainButtonColour,
                alignItems: "center",
                width: '50%',
                borderRadius: 20,
                justifyContent: "center",
            },
            buttonText: {
                color: this.state.bTextColour,
                fontSize: 20,
                textAlign: "center"
            },
            missionText: {
                borderColor: '#330000',
                borderWidth: 2,
                backgroundColor: '#cc0000',
                margin: 5,
                padding: 5,
                borderRadius: 10,
                position: "absolute",
                top: 20,
                zIndex: 1
            },
            missionDetails: {
                color: '#f5e653',
            },
            rejectButton: {
                textAlign: "center",
                color: '#eee',
                backgroundColor: '#660000',
                alignItems: "center",
                borderRadius: 20,
                justifyContent: "center"

            },
            rejectText: {
                color: '#990000'

            },
            bottomSection: {
                marginBottom: 30,
                marginTop: 10,
                width: '30%',
                height: '10%',

            },
            clock: {
                height: 200,
                width: 250
            }
        });

        buttonPress = () => {

            this.setState({ showRejectButton: false })
            if (this.state.missionAvailable) {
                if (this.state.mButtonText == 'ACCEPT') {
                    this.updateMissionTo('accepted')
                    setTimeout(() => {
                        this.checkMissions();
                    }, 300);
                } else {
                    this.setState({
                        showMission: true,
                        mButtonText: 'ACCEPT',
                        bTextColour: '#ccc',
                        mainButtonColour: '#006600',
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
            console.log('#####', this.state.missionAvailable)
            if (!this.state.missionActive && !this.state.missionAvailable) {
                this.updateMissionTo('new')
            }
            setTimeout(() => {
                this.checkMissions()
            }, 500);
        }

        return (
            <Swiper ref={(swiper) => {this._swiper = swiper;}} showsButtons={false} loop={false} showsPagination={false}>
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
                    userId={this.state.userId} 
                    missionInfo={this.state.missionInfo} 
                    setMissionComplete={this.setMissionComplete}
                    missionActive={this.state.missionActive}
                    missionDescription={this.state.missionDescription}
                />}
            </Swiper>
        )
    }
}


