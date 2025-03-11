import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';

import { useFonts } from 'expo-font';
import { Quicksand_500Medium } from '@expo-google-fonts/quicksand';
import { Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import { Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function HomeScreen() {
  
    const [fontsLoaded] = useFonts({
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
    });
  
  
    return (
        <View style={styles.container}>
            <Text style={styles.dialogueText}>
                oh, hi natalie!
            </Text>
            
            <Text>
                [IMAGE GOES HERE]
            </Text>
            
            <View style={styles.weeklyContainer}>

                <Text style={styles.weeklyTitleText}>
                    This Week
                </Text>
                <Text style={styles.weeklyTitleSubtitleText}>
                    All set until tomorrow!
                </Text>

                <View style={styles.allDaysContainer}>

                    <View style={styles.allDaysBotRowContainer}>

                        <TouchableOpacity style={styles.dayButton}>
                            <Text style={styles.buttonText}>
                                21
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dayButton}>
                            <Text style={styles.buttonText}>
                                22
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dayButton}>
                            <Text style={styles.buttonText}>
                                23
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dayButton}>
                            <Text style={styles.buttonText}>
                                24
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.allDaysTopRowContainer}>

                        <TouchableOpacity style={styles.dayButton}>
                            <Text style={styles.buttonText}>
                                25
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dayButton}>
                            <Text style={styles.buttonText}>
                                26
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dayButton}>
                            <Text style={styles.buttonText}>
                                27
                            </Text>
                        </TouchableOpacity>


                    </View>



                </View>


            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    dialogueText: {
        color: '#333333',
        fontSize: 20,
        fontFamily: 'Quicksand_600SemiBold',
    },
    weeklyContainer: {
        backgroundColor: '#333333',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 18,
        paddingBottom: 24,
        borderRadius: 16,
        width: '95%',
    },
    weeklyTitleText: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Quicksand_700Bold',
    },
    weeklyTitleSubtitleText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Quicksand_500Medium',
        opacity: 0.75,
    },
    allDaysContainer: {
        marginTop: 10,
    },
    allDaysTopRowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    allDaysBotRowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dayButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        // padding: 18,
        width: 60,
        height: 60,
        shadowColor: '#999999',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 0.1
    },
    buttonText: {
        color: '#333333',
        fontSize: 22,
        fontFamily: 'Quicksand_600SemiBold',
        textAlign: 'center',
        marginTop: 15,
    },

  });
  