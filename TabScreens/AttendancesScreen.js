// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, RefreshControl, SafeAreaView, ScrollView, Image, ActivityIndicator} from 'react-native';
import {base_url, headers} from "../assets/variabili";
import {Divider} from "react-native-elements";
import {
  ProgressChart
} from 'react-native-chart-kit'
import styles from "../assets/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class AttendancesScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datiaccesso: props.datiaccesso,
            username: '',
            token: '',
            date: new Date(),
            isLoading: true,
            refreshing: false,
            data: [],
            url: '',
            labelColor: 'black',
        };
    }

    async getUsername() {
      let username = await AsyncStorage.getItem("user");
      username = username.replace(/\s/g, '');
      this.setState({"username": username});
    }

    async getToken() {
      let token = await AsyncStorage.getItem("token");
      token = token.replace(/\s/g, '');
      this.setState({"token": token});

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
        this.getUsername()
        this.getToken()
            .then(()=>{
                headers.set('Authorization', 'Token ' + this.state.token)

        let url = base_url + this.state.username + '/'
        fetch(url, {method:'GET', headers: headers})
            .then((response) => response.json())
            .then((json) => {
                this.setState({data: json})
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false})
                this.setState({labelColor: this.getLabelColor(this.state.data.attendances[0])})
            });
            })
    }

    render() {
        const chartColor = (value, opacity) =>{
            let color = ''
            0.20 <= value ? color = `rgba(255, 0, 0, ${opacity})` : 0.10 <= value && value < 0.20 ? color = `rgba(255, 128, 0, ${opacity})` : color = `rgba(0, 184, 207, ${opacity})`
            return color
        }
        const onRefresh = () => {
            setTimeout(() => {
            this.setState({ 'refreshing' : true })
        }, 200);
        this.setState({ 'refreshing' : false })
          }
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{backgroundColor: '#00b8cf', height: '100%', flex: 1}}>
                {this.state.isLoading ?
                    <ActivityIndicator
                        animating={this.state.isLoading}
                        color="#FFFFFF"
                        size="large"
                        style={styles.activityIndicator}
                    />
                      :(

                    <ScrollView refreshControl={
                        <RefreshControl
                            // refreshing={this.state.refreshing}
                            refreshing={false}
                            onRefresh={onRefresh}
                        />
                    }
                                style={styles.main_container}>
                        {this.state.data.photo_url !== '' ?
                            <Image
                                style={{width: 80, height: 80, alignSelf: 'center', borderRadius: 50, marginBottom: 10}}
                                source={{uri: this.state.data.photo_url,}}
                            />
                            : null
                        }
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginTop: 20,
                            textTransform: 'uppercase',
                            color: '#007887'
                        }}>
                            {this.state.data.name} {this.state.data.surname}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'left',
                                    marginBottom: 20,
                                }}>

                                {'\n\n'}
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.absences}>{this.state.data.absences[0]}</Text>
                                    <Text style={styles.absences_label}>Assenze</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.delays}>{this.state.data.absences[1]}</Text>
                                    <Text style={styles.delays_label}>Ritardi</Text>
                                </View>
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    textAlign: 'left',
                                    marginBottom: 40,
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.exit}>{this.state.data.absences[2]}</Text>
                                    <Text style={styles.exit_label}>Uscite ant.</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.partial}>{this.state.data.absences[3]}</Text>
                                    <Text style={styles.partial_label}>Ass. parziali</Text>
                                </View>
                            </Text>
                        </View>
                        <View>
                            <Divider/>
                            <Text style={{
                                    fontSize: 20,
                                    textAlign: 'center',
                                    marginTop: 20,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        textAlign: 'center',
                                        color: 'grey',
                                    }}>
                                    {this.state.date}
                                    {'\n'}
                                </Text>
                                {
                                    this.state.data.today_attendance ==='Ritardo' ?
                                        <Text style={{color:'orange'}}> Oggi è in {this.state.data.today_attendance}</Text>
                                        : this.state.data.today_attendance ==='Assente' ?
                                        <Text style={{color:'green'}}> Oggi è {this.state.data.today_attendance}</Text>
                                        : this.state.data.today_attendance === '' ?
                                            <Text>Presenze non ancora rilevate!</Text>
                                            :<Text style={{color:'red'}}> {this.state.data.today_attendance}</Text>

                                }
                            </Text>
                            {
                                this.state.data.attendances[1] !== 1 ?
                                    <><ProgressChart
                                        data={[this.state.data.attendances[0], this.state.data.attendances[1]]}
                                        height={200}
                                        width={200}
                                        style={{alignSelf:"center"}}
                                        strokeWidth={16}
                                        radius={0}
                                        hideLegend={true}
                                        chartConfig ={{
                                            backgroundGradientFrom: "white",
                                            backgroundGradientFromOpacity: 1,
                                            backgroundGradientTo: "white",
                                            backgroundGradientToOpacity: 1,
                                            color: (opacity = 1) => chartColor(this.state.data.attendances[0], opacity),
                                        }}
                                    />
                                    <Text style={{
                                        textAlign:'center',
                                        color: this.state.labelColor,
                                        fontWeight:"600"
                                    }}>PRESENZE IN AULA: {Math.round(this.state.data.attendances[1]*100, 0)}%
                                    </Text></>
                            :
                                <Text style={{
                                    textAlign:'center',
                                    marginTop: 10,
                                    color: this.state.labelColor,
                                    fontWeight:"600"
                                }}>Ancora nessuna lezione quest'anno...
                                </Text>
                            }



                        </View>

                    </ScrollView>

                    )}</View>
            </SafeAreaView>
        )
    }
}

