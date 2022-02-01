// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import styles from "../assets/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../components/Loader';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSignInAlt} from "@fortawesome/pro-light-svg-icons";


const LoginScreen = ({navigation}) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!username) {
      setErrortext('\n Inserisci un nome utente! \n\n');
      return;
    }
    if (!password) {
      setErrortext('\n Inserisci una password! \n\n');
      return;
    }
    setLoading(true);
    let dataToSend = {username: username, password: password};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://gestionalecfp.herokuapp.com/anagrafica/api-token-auth/', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        // If server response message same as Data Matched
        if (responseJson.token) {
          AsyncStorage.setItem('user', username);
          AsyncStorage.setItem('token', responseJson.token);
          AsyncStorage.setItem('user_id', responseJson.user_id.toString());
          AsyncStorage.setItem('course', responseJson.course.toString());
          navigation.replace('TabNavigatorFooter');
        } else {
          setErrortext('\n Nome utente / password non validi! \n\n');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        alert('Nome utente o password non validi!');
      });
  };

  return (
    <View style={{backgroundColor:'#00b8cf', height:'100%', flex:1}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}><View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/bot.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
        <View style={styles.main_container}>
          <KeyboardAvoidingView enabled>
            <Text><FontAwesomeIcon icon={ faSignInAlt } style={{marginRight: 7, color:'gray'}}/>&nbsp;LOGIN</Text>

            <View style={styles.SectionStyle}>

              <TextInput
                style={styles.inputStyle}
                onChangeText={(username) =>
                  setusername(username)
                }
                placeholder="Username" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(password) =>
                  setpassword(password)
                }
                placeholder="Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext !== '' ? (
              <Text style={{
                color: 'red',
                marginTop: 20,
                backgroundColor: '#f8d7da',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'red',
                paddingVertical: 5,
                paddingHorizontal: 10,}}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;
