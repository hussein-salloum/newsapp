import React from 'react';
import { createStackNavigator }  from '@react-navigation/stack';

import HeadlinesScreen from '../screens/HeadlinesScreen';
import HeadlineDetailsScreen from '../screens/HeadlineDetailsScreen';


const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Headlines" component={HeadlinesScreen} />
        <Stack.Screen name="HeadlineDetails" component={HeadlineDetailsScreen} />
    </Stack.Navigator>
);

export default FeedNavigator;