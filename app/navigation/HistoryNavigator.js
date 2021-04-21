import React from 'react';
import { createStackNavigator }  from '@react-navigation/stack';

import HistoryScreen from '../screens/HistoryScreen';
import HeadlineDetailsScreen from '../screens/HeadlineDetailsScreen';


const Stack = createStackNavigator();

const HistoryNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="HeadlineDetails" component={HeadlineDetailsScreen} />
    </Stack.Navigator>
);

export default HistoryNavigator;