// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView, ScrollView, Image, ActivityIndicator, FlatList} from 'react-native';
import {base_url, headers} from "../assets/variabili";
import styles from "../assets/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lesson from "../components/Lesson";


export default class ScheduleScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datiaccesso: props.datiaccesso,
            username: '',
            token: '',
            course: '',
            date: new Date(),
            isLoading: true,
            data: [],
            url: '',
            labelColor: '',
            day_check: '',
        };
    }

    async getUsername() {
      let username = await AsyncStorage.getItem("user");
      username = username.replace(/\s/g, '');
      let course = await AsyncStorage.getItem("course");
      course = course.replace(/\s/g, '');
      this.setState({"username": username, "course": course});
    }

    async getToken() {
      let token = await AsyncStorage.getItem("token");
      token = token.replace(/\s/g, '');
      this.setState({"token": token});

    }

    async getCourse() {
      let course = await AsyncStorage.getItem("course");
      course = course.replace(/\s/g, '');
      this.setState({"course": course});

    }

    getLabelColor = (value) =>{
        let color = ''
        0.20 <= value ? color = `#ff0000` : 0.10 <= value && value < 0.20 ? color = `#ff8000` : color = `#00b8cf`
        return color
    }

    componentDidMount() {
        let today =
            this.state.date.getDate() + "/" +
            this.state.date.getMonth() + "/" +
            this.state.date.getFullYear()
        this.setState({date: today})
        this.getCourse()
        this.getUsername()
        this.getToken()
            .then(()=>{
                headers.set('Authorization', 'Token ' + this.state.token)
        let url = 'https://gestionalecfp.herokuapp.com/frequenze/lezioni/orario/invia/api/course=' + this.state.course + '/'
        fetch(url, {method:'GET', headers: headers})
            .then((response) => response.json())
            .then((json) => {
                this.setState({data: json})
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false})
            });
            })
    }

    check_if_day_changed = (day, array, index) => {
        let day_has_changed = false
        if (index>0){
            let obj = array[index-1]
            if (obj.day !== day){
                day_has_changed = true
            }
        } else {
            day_has_changed = true
        }


        return day_has_changed
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#00b8cf'}}>
                <View style={{backgroundColor: '#00b8cf', height: '100%', flex: 1}}>
                {this.state.isLoading ?
                    <ActivityIndicator
                        animating={this.state.isLoading}
                        color="#FFFFFF"
                        size="large"
                        style={styles.activityIndicator}
                    />
                      :(

                    <View style={styles.main_container}>
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginVertical: 20,
                            color: '#007887'
                        }}>
                            IL TUO ORARIO
                        </Text>
                        {this.state.data.length <= [] ?
                            <Text style={{flex: 1, fontSize: 18, color: 'red', textAlign:'center'}}>
                                L'orario non è disponibile!
                            </Text> : (
                                <FlatList
                                    data={this.state.data}
                                    renderItem={({item, index}) => <Lesson
                                        id={item.id}
                                        day={item.day}
                                        hour={item.hour}
                                        day_has_changed={this.check_if_day_changed(item.day, this.state.data, index)}
                                        readable_uf={item.readable_uf}
                                        teacher={item.teacher}
                                    />}
                                    keyExtractor={item => item.id}
                                />
                            )}
                    </View>
                    )}</View>
                <Text>{'\n\n'}</Text>
            </SafeAreaView>
        )
    }
}

