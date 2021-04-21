import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Image } from 'react-native-expo-image-cache';
import moment from 'moment';

import colors from '../config/colors';

function AppCard( {title, content, source, publishedAt, imageUrl, viewedAt, onPress}) {
        
    const publishedAtFormat =  moment(publishedAt).format('MMMM Do YYYY, h:mm:ss a');
    const viewedAtFormat =  moment(viewedAt).calendar();; 

    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={ styles.card }>
            <Image style={styles.image} 
                tint="light"
                uri={imageUrl} />
            <View style={styles.detailsContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content} numberOfLines={2}>{content}</Text>
            <Text style={styles.source}>{source}</Text>
            {viewedAt? <Text style={styles.viewedAt}>Viewed {viewedAtFormat}</Text> : 
            <Text style={styles.publishedAt}>{publishedAtFormat}</Text>}           
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden",
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        marginBottom: 7,
        fontWeight: "bold",
        fontSize: 15,
    },
    content: {
        marginBottom: 7,
    },
    image: {
        width: "100%",
        height: 200,
    },
    source: {
        color: colors.blue,
        fontWeight: "bold",
        marginBottom: 7,
    },
    publishedAt: {
        fontWeight: "bold",
        textAlign: "right"
    },
    viewedAt: {
        fontWeight: "bold",
        textAlign: "right"
    },
})

export default AppCard;