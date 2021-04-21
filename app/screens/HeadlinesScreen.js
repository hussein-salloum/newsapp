import React, {useState, useEffect, useContext } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Picker } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ActivityIndicator from '../components/ActivityIndicator';
import AppCard from '../components/AppCard';
import client from '../api/client';
import Screen from '../components/Screen';
import colors from '../config/colors';
import useApi from "../hooks/useApi";

import { useDispatch } from 'react-redux';
import { headlineAdded } from '../redux/actions';

import CountryPicker from '../components/CountryPicker';
import CountryContext from '../hooks/context';

const countries = [ 
    {
    name: "United States",
    code: "us",
    url: "https://www.countryflags.io/us/flat/32.png",
    },
    {
    name: "Egypt",
    code: "eg",
    url: "https://www.countryflags.io/eg/flat/32.png",
    },
    {
    name: "United Arab Emirates",
    code: "ae",
    url: "https://www.countryflags.io/ae/flat/32.png",
    },
    {
    name: "France",
    code: "fr",
    url: "https://www.countryflags.io/fr/flat/32.png",
    },
    {
    name: "Argentina",
    code: "ar",
    url: "https://www.countryflags.io/ar/flat/32.png",
    },
    {
    name: "South Africa",
    code: "za",
    url: "https://www.countryflags.io/za/flat/32.png",
    },
]

function HeadlinesScreen({ navigation }) {  
    const [refreshing, setRefreshing] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const {countryCode}  = useContext(CountryContext);

    let endpoint;
    {countryCode ? endpoint="/top-headlines?country="+countryCode : endpoint="/top-headlines?country=us"}
    {selectedValue !== "all"? endpoint=endpoint+"&category="+selectedValue : endpoint=endpoint}

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
        <Text style={styles.title}> Today's Picks </Text>
        </View>
        {getHeadlinesApi.error && <>
            <Text>Couldn't retrieve the Headlines.</Text>
            <Button title="Retry" onPress={getHeadlinesApi.request()}/>
        </>}
        <View style={styles.filterContainer}>
            <MaterialCommunityIcons name="filter" size={24} color={colors.medium}/>  
            <Text style={styles.filterTitle}> Filter </Text>
                <View style={styles.pickerContainer}>
                 <Picker
                    selectedValue={selectedValue}
                    itemStyle={{fontSize: 16, height: 35}}
                    style={{ width: 130, }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                 >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Business" value="business" />
                    <Picker.Item label="Sports" value="sports" />
                    <Picker.Item label="Technology" value="technology" />
                </Picker> 
            </View>
            <CountryPicker countries={countries}/>    
            <View style={{ marginLeft: 20}}/> 
            <Button color={colors.danger} title="Apply" onPress={() => getHeadlinesApi.request()}/>
        </View>
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
    },
    title: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 20,
    },
     filterContainer: {
         alignItems: "center",
         justifyContent: "flex-start",
         flexDirection: "row",
         padding: 2,
         marginBottom: 5,
         borderBottomWidth: 1,
         borderColor: colors.medium,
    },
    filterTitle: {
        fontWeight: "bold",
        color: colors.medium,
        fontSize: 16,
    },
    pickerContainer:{
        marginRight: 15,
        marginLeft: 7,
    }
})

export default HeadlinesScreen;