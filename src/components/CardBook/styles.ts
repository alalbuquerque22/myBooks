import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginVertical: height * 0.01,
    },
    card: {
        backgroundColor: '#fff',
        width: width * 0.9,
        height: height * 0.24,
        borderRadius: 5,
        elevation: 10,
        shadowColor: '#acacac',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,


    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        },
    cardImage: {
        padding: 10,
    },
    image: {
        marginHorizontal:width * 0.02,
        marginVertical:height * 0.01,
        height: height * 0.18,
        width: width * 0.23,
        maxHeight: height * 0.20,
    
    },
    cardText: {
        flex: 1,
        height: height * 0.20,

    },
    cardTitle: {
        fontSize: width * 0.05,
        fontFamily: 'Heebo_700Bold',
        color: '#000',
        
        textAlign: 'left',
    },
    cardAuthor: {
        fontSize: width * 0.04,
        fontFamily: 'Heebo_400Regular',
        color: '#AB2680',
    },
    cardDescription: {
        marginTop: height * 0.05,
        fontSize: width * 0.03,
        fontFamily: 'Heebo_400Regular',
        color: '#ACACAC',
    },

})
export default styles;