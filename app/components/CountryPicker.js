import React, { useContext, useState } from 'react';
import { Modal, StyleSheet, TouchableHighlight, View, Image, FlatList, Button } from 'react-native';


import colors from '../config/colors';
import CategoryPickerItem from './CategoryPickerItem';
import CountryContext from '../hooks/context';

function CountryPicker({ countries, onPress }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState('https://www.countryflags.io/us/flat/32.png');
    const { countryCode, setCountryCode } = useContext(CountryContext);

    return (
        <>
        <View>
        <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}>
         <Image style={styles.logo} source={{ uri: imageUrl }}/>
        </TouchableHighlight>     
        </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalView}>
                    <FlatList 
                    data={countries}
                    keyExtractor={(item) => item.name.toString()}
                    numColumns="3"
                    renderItem={({item}) => (
                        <CategoryPickerItem 
                            name = {item.name}
                            imageUrl = {item.url}
                            onPress = { () => { onPress
                              setModalVisible(!modalVisible);
                              setImageUrl(item.url);   
                              setCountryCode(item.code);
                            }
                            }
                        />
                    )} />
                    <Button title="Hide"
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    </Button>
                </View>
            </Modal>

    </>    
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 32,
        height: 32,
      },
    results: {
        color: colors.black,
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "right",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      },
      modalView: {
        paddingTop: 10,
        marginTop: 100,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
})

export default CountryPicker;