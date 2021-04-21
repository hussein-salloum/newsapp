import React, {useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';

import client from '../api/client';
import Screen from '../components/Screen';
import colors from '../config/colors';
import useApi from "../hooks/useApi";
import AppCard from '../components/AppCard';

import { useSelector, useDispatch } from 'react-redux';
import { headlineAdded } from '../redux/actions';

function SourceHeadlinesScreen({route, navigation}) {
    const [refreshing, setRefreshing] = useState(false);

const params = route.params;
let endpoint = "top-headlines?sources="+params;

const getHeadlines = () => client.get(endpoint);
const getHeadlinesApi = useApi(getHeadlines);

const dispatch = useDispatch();
const addToHistory = headline => dispatch(headlineAdded(headline.title, headline.content, headline.source.name, headline.publishedAt, headline.urlToImage, headline.author));


useEffect(() => {
    getHeadlinesApi.request();
  }, []);
  
    return (
        <>
        <ActivityIndicator visible={getHeadlinesApi.loading} />
        <Screen style={styles.screen}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}> {params} </Text>
        </View>
        {getHeadlinesApi.error && <>
            <Text>Couldn't retrieve the Headlines.</Text>
            <Button title="Retry" onPress={getHeadlinesApi.request()}/>
        </>}
        <FlatList
            data={getHeadlinesApi.data.articles}
            keyExtractor={(headline) => headline.title.toString()}
            renderItem={({ item }) => (
            <AppCard
                title={item.title}
                content={item.content}
                source={item.source.name}
                publishedAt={item.publishedAt}
                imageUrl={item.urlToImage}
                onPress={() => {
                  addToHistory(item);
                  navigation.navigate( "HeadlineDetails" , item);
                } }
            />
            )}
            refreshing={refreshing}
            onRefresh={() => getHeadlinesApi.request()}
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

export default SourceHeadlinesScreen;