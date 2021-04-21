import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

function CategoryPickerItem( {name, imageUrl, onPress }) {
    return (
       
        <View style={styles.Container}>
           <TouchableOpacity onPress={onPress}>
           <Image style={styles.logo} source={{ uri: imageUrl }}/>
            <Text style={styles.label}>{name}</Text>
           </TouchableOpacity>
        </View>
       
    )
}

const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 30,
        alignItems: "center",
        width: "33%"
    },
    label: {
        marginTop: 5,
        textAlign: "center",
    },
    logo: {
        width: 80,
        height: 80,
    }
})

export default CategoryPickerItem;