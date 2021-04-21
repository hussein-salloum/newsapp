import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HeadlinesNavigator from './HeadlinesNavigator';
import SourcesNavigator from './SourcesNavigator';
import HistoryNavigator from './HistoryNavigator';

const Tab = createBottomTabNavigator();

function AppNavigator(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Headlines"
                component={HeadlinesNavigator}
                options = {{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="home" size={size} color={color} />        
                }} />
            <Tab.Screen 
                name="Sources"
                component={SourcesNavigator}
                options = {{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="grid" size={size} color={color} />
                }} />
            <Tab.Screen 
                name="History"
                component={HistoryNavigator}
                options = {{tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="history" size={size} color={color} />
                }} />
        </Tab.Navigator>
    );
}

export default AppNavigator;