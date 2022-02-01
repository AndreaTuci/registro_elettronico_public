import React, {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    Image
} from 'react-native';
import styles from "../assets/styles";

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('token').then((value) =>
        navigation.replace(
          value === null ? 'login' : 'TabNavigatorFooter'
        ),
      );
    }, 1000);
  }, []);

  return (
    <View style={styles.base}>
        <View style={{ paddingVertical: 100 }}>
                <Image
                    style={{width: 150, height: 150, alignSelf: 'center'}}
                    source={require('../assets/bot.png')}
                />

            </View>

      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
        <Text style={{
                fontSize: 25,
                color: '#ffffff',
                alignSelf: 'center'}}>
                {'\n'}TutorBot
            </Text>
    </View>
  );
};

export default SplashScreen;

