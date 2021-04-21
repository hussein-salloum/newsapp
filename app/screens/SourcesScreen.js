import React, {useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';

import Screen from '../components/Screen';
import colors from '../config/colors';
import sourcesApi from '../api/Sources';
import useApi from "../hooks/useApi";
import ListItem from '../components/ListItem';

function SourcesScreen({ navigation }) {   
    const getSourcesApi = useApi(sourcesApi.getSources);
    const [refreshing, setRefreshing] = useState(false);

    
   useEffect(() => {
        getSourcesApi.request();
      }, []); 

    return (
        <>
        <ActivityIndicator visible={getSourcesApi.loading} />
        <Screen style={styles.screen}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}> Sources </Text>
        </View>
        <View style={styles.container}>
        <FlatList
          data={getSourcesApi.data.sources}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => ( 
          <ListItem name={item.name}
            onPress={() => navigation.navigate( "SourceHeadlines" , item.name)}
          />  
         )}
          refreshing={refreshing}
          onRefresh={() => getSourcesApi.request()}
        />
        </View>
        </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.light,
      },
    container: {
        flex: 1,
      },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.light,
    },
    titleContainer: {
        alignItems: "center",
        backgroundColor: colors.medium,
        height: 50,
        justifyContent: "center",
        width: "100%",
        marginBottom: 10,
    },
    title: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 20,
    },
})

export default SourcesScreen;