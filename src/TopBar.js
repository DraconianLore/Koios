import React from 'react';

import { StyleSheet, View, Image } from 'react-native';

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRank: '',
            nextRank: '',
        }
    }

    render() {
        console.log(this.props.rank)
        switch(this.props.rank) {
            case 0:
                currentRank = require('../assets/images/iron.png')
                nextRank = require('../assets/images/bronze.png')
                break;
            case 1:
                currentRank = require('../assets/images/bronze.png')
                nextRank = require('../assets/images/silver.png')
                break;
            case 2:
                currentRank = require('../assets/images/silver.png')
                nextRank = require('../assets/images/gold.png')
                break;
            case 3:
                currentRank = require('../assets/images/gold.png')
                nextRank = require('../assets/images/platinum.png')
                break;
            case 4:
                currentRank = require('../assets/images/platinum.png')
                nextRank = require('../assets/images/eye.png')
                break;
        }
        
        const styles = StyleSheet.create({
            flexbox: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row'
            },

            header: {
                padding: 10,
                height: 50,
                width: '100%',
                backgroundColor: '#121212',
                borderBottomWidth: 0.5,
                borderBottomColor: '#ff3333'
            },

            progress: {
                height: 3,
                backgroundColor: '#000',
                borderRadius: 10,
                width: '70%',
            },
            
            color: {
                height: 3,
                width: `${this.props.exp}%`,
                backgroundColor: '#ff3333',
                borderRadius: 10,
                shadowOpacity: 1,
                shadowRadius: 5,
                shadowColor: '#ff0000',
                shadowOffset: {height: 0, width: 0}
            },

            empty: {
                height: 3,
                width: `${100 - this.props.exp}%`,
            },
            ranks: {
                width: 20,
                height: 25
            }
        })

        return (
            <View style={styles.header}>
                <View style={styles.flexbox}>
                    <Image
                        source={currentRank}
                        style={styles.ranks}
                    />
                    <View style={styles.progress}>
                        <View
                            style={styles.color}
                        />
                        <View
                            style={styles.empty}
                        />
                    </View>
                    <Image
                        source={nextRank}
                        style={styles.ranks}
                    />
                </View>
            </View>
        )
    }
}
