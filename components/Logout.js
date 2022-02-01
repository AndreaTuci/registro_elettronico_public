import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import styles from "../assets/styles";

const logout = ({navigation}) => {
const handleSubmit = () => {
    AsyncStorage.clear();
    navigation.replace('login')

}
return(
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor:'#00b8cf', height:'100%', flex:1}}>
          <ScrollView style={styles.main_container}>
              <Text>Premi per disconnetterti</Text>
              <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonTextStyle}>LOGOUT</Text>
              </TouchableOpacity>
          </ScrollView>
      </View>
    </SafeAreaView>
);
}

export default logout;
