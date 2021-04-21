import React from 'react';
import { createStackNavigator }  from '@react-navigation/stack';

import SourcesScreen from '../screens/SourcesScreen';
import SourceHeadlinesScreen from '../screens/SourceHeadlinesScreen';
import HeadlineDetailsScreen from '../screens/HeadlineDetailsScreen';


const Stack = createStackNavigator();

const SourcesNavigator = () => (
    <Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sources" component={SourcesScreen} />
        <Stack.Screen name="SourceHeadlines" component={SourceHeadlinesScreen} />
        <Stack.Screen name="HeadlineDetails" component={HeadlineDetailsScreen} />
    </Stack.Navigator>
);

export default SourcesNavigator;