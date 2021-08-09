import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import BadgesScreen from './BadgesScreen'
import UserStack from '../UsersScreen/UserStack'
import Favorites from '../Favorites/Favorites'
import Colors from '../../res/Colors'

const Tab = createBottomTabNavigator();

const BadgesTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl,
                },
                headerTintColor: Colors.white,
            }}
        >
            <Tab.Screen
                name="User"
                component={UserStack}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Image style={{ tintColor: color, width: size, height: size }}
                            source={require('../../assets/user_icon.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="BadgesScreen"
                component={BadgesScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Image style={{ tintColor: color, width: size, height: size }}
                            source={require('../../assets/list2.png')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Image style={{ tintColor: color, width: size, height: size }}
                            source={require('../../assets/notFavorite.png')}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BadgesTabNavigator;