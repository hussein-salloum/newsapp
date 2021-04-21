import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';


function ListItem({ name, image , onPress }) {
    return (
       <TouchableHighlight 
       underlayColor={colors.light}
       onPress={onPress}>
       <View style={styles.Container}>
        {image && <Image style={styles.image} source={{ uri : image}} />}
        <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>{name}</Text>
        </View> 
        <MaterialCommunityIcons name="chevron-right" size={25} color={colors.medium}/>         
       </View>
       </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    Container: {
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        backgroundColor: colors.white,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    title: {
        fontWeight: "500",
    },    
})
export default ListItem;