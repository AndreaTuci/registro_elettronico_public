import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from "./components/Login"
import SplashScreen from "./components/SplashScreen";
import TabNavigatorFooter from "./components/TabNavigatorFooter";


const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export class App extends React.Component {
    datiaccesso;

    constructor(props) {
        super(props);
        this.state = {
            opening: true,
            need_login: true,
            isLoading: true,
            data: [],
        };
    }


    render() {

        setTimeout(() => {
            this.setState({opening: false})
        }, 3500)


        return (
            <SafeAreaProvider>
                <View style={{ backgroundColor:'#00b8cf', height:'100%', flex:1 }}>
                    <NavigationContainer>
                        <Stack.Navigator>

                            <Stack.Screen name="splashscreen" component={SplashScreen} options={{headerShown: false}}/>

                             <Stack.Screen
                                 name="Auth"
                                 component={Auth}
                                 options={{headerShown: false}}
                             />
                            {/* Navigation Drawer as a landing page */}
                            <Stack.Screen
                                name="TabNavigatorFooter"
                                component={TabNavigatorFooter}
                                options={{headerShown: false}}
                                // Hiding header for Navigation Drawer
                                // options={{headerShown: false}}
                            />


                            <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>


                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </SafeAreaProvider>
        )
    }
}



export default App;
