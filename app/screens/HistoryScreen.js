import React, {useState, useEffect } from 'react';
import { AsyncStorage, Button, FlatList, StyleSheet, Text, View, Alert } from 'react-native';

import Screen from '../components/Screen';
import colors from '../config/colors';
import AppCard from '../components/AppCard';

import { useSelector } from 'react-redux';
import logger from '../utility/logger';

function HistoryScreen({navigation}) {
    const [refreshing, setRefreshing] = useState(false);
    const [ data , setData] = useState([]); 

    const { headlines } = useSelector(state => state.headlinesReducer);

    const getStore = () => {
        const array = headlines;
        array.sort((a, b) => b.timestamp > a.timestamp ? 1: -1);
        setData(array); 
      };
    
    const clearHistory = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          logger.log(e)
        }   
        logger.log('History Cleared..')
        setData(null);
      };

    const createAlert = () =>
      Alert.alert(
        "Clear History?",
        "Are you sure you want to clear history ?",
        [
          {
            text: "Cancel", onPress: () => console.log("Cancel Pressed")
          },
          { text: "OK", onPress: () => clearHistory() }
        ],
      );


    useEffect(() => {
        getStore();
      }, []); 

    return (
        <>
        <Screen style={styles.screen}>

        <View style={styles.Container}>
        <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>History</Text>
        </View> 
        <Button color={colors.danger} title="Clear" onPress={createAlert} />        
       </View>
        <FlatList
            data={data}
            keyExtractor={(headline) => headline.title.toString()}
            renderItem={({ item }) => (
            <AppCard
                title={item.title}
                content={item.content}
                source={item.sourceName}
                viewedAt={item.timestamp}
                source={item.source.name}
                imageUrl={item.urlToImage}
                onPress={() => {
                  navigation.navigate( "HeadlineDetails" , item);
                } }
            />
            )}
            refreshing={refreshing}
            onRefresh={() => getStore()}
        />
        </Screen>
        </> 
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.light,
      },
    Container: {
      alignItems: "center",
      flexDirection: "row",
      padding: 10,
      backgroundColor: colors.medium,
      marginBottom: 10,
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
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },    
})

export default HistoryScreen;