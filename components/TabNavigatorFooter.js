// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {SafeAreaView} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAlarmExclamation, faCommentsAlt, faExclamationTriangle, faCalendarAlt, faSignOutAlt} from "@fortawesome/pro-light-svg-icons";
import CommunicationsScreen from "../TabScreens/CommunicationsScreen";
import AttendancesScreen from "../TabScreens/AttendancesScreen";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import AppHeader from "./AppHeader";
import {createStackNavigator} from "@react-navigation/stack";
import logout from "./Logout";
import DisciplinaryScreen from "../TabScreens/DisciplinaryScreen";
import ScheduleScreen from "../TabScreens/ScheduleScreen"


const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();
const TabNavigatorFooter = (props) => {

  return (
    <SafeAreaView style={{flex: 1}}>

                <AppHeader/>



        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{
                paddingTop: 7,
                backgroundColor: '#ffffff',
                shadowOffset:{width:0, height: -2},
                shadowColor:'gray',
                shadowOpacity:0.4,
                shadowRadius:7
            }}

        >
            <Tab.Screen
                name="HomeScreen"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                            <FontAwesomeIcon icon={ faAlarmExclamation }/>
                    ),
                }}
                component={AttendancesScreen}
            />
            <Tab.Screen
                name="SettingsScreen"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                            <FontAwesomeIcon icon={ faCommentsAlt } />
                    ),
                }}
                component={CommunicationsScreen}
            />
            <Tab.Screen
                name="DisciplinaryScreen"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                            <FontAwesomeIcon icon={ faExclamationTriangle } />
                    ),
                }}
                component={DisciplinaryScreen}
            />
            <Tab.Screen
                name="ScheduleScreen"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                            <FontAwesomeIcon icon={ faCalendarAlt } />
                    ),
                }}
                component={ScheduleScreen}
            />
            <Tab.Screen
                name="Logout"
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                            <FontAwesomeIcon icon={ faSignOutAlt } />
                    ),
                }}
                component={logout}
            />
        </Tab.Navigator>
    </SafeAreaView>
  );
};
export default TabNavigatorFooter;
