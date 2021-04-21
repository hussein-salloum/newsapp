import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import moment from 'moment';

import Screen from '../components/Screen';
import colors from '../config/colors';

function HeadlineDetailsScreen({ route }) {
    const item = route.params;

    const date = moment(item.publishedAt).format('MMMM Do YYYY');
    const time = moment(item.publishedAt).format('h:mm:ss a');

    return (
        <Screen style={styles.screen}>
        <ScrollView>
        <View style={styles.Container}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.separator} />
            <View style={styles.detailsContainer}>
            <Text style={styles.details}>By {item.author}</Text>
            <Text style={ [styles.details, styles.more ]}>{date} / {time} / {item.source.name}</Text>
            </View>
        </View>    
            <Image style={styles.image} 
                tint="light"
                uri={item.urlToImage} />
            <Text style={styles.content}>{item.content}</Text>
        </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: colors.dark,
        padding: 10, 
    },
    title: {
        marginBottom: 7,
        fontWeight: "bold",
        fontSize: 25,
        color: colors.white,
        marginBottom: 20,
        marginTop: 15,
    },
    detailsContainer: {
        marginBottom: 15,
        marginTop: 20,
    },
    details: {
        color: colors.white,
        textTransform: "uppercase",
        fontWeight: 'bold', 
        fontSize: 11,
    },
    more: {
        color: '#707070',
    },
    content: {
        padding: 20,
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: 270,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.light,
    },
})

export default HeadlineDetailsScreen;

