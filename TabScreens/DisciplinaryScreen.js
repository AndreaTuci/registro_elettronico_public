// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {base_url, headers} from "../assets/variabili";

import styles from "../assets/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisciplinaryMeasure from "../components/DisciplinaryMeasure";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faThumbsUp} from "@fortawesome/pro-light-svg-icons";

export default class DisciplinaryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datiaccesso: props.datiaccesso,
            isFetching: false,
            username: '',
            token: '',
            date: new Date(),
            isLoading: true,
            measures_data: [],
            communications_data: [],
            url: '',
            notesExpanded: false,
            docsExpanded: false,
        };
    }

    toggleNotesExpanded = () => {
        this.state.notesExpanded === true ?
            this.setState({'notesExpanded': false})
            : this.setState({'notesExpanded': true})
    }

    toggleDocsExpanded = () => {
        this.state.docsExpanded === true ?
            this.setState({'docsExpanded': false})
            : this.setState({'docsExpanded': true})
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

        let url = base_url + 'note/' + this.state.username + '/'
        fetch(url, {method:'GET', headers: headers})
            .then((response) => response.json())
            .then((json) => {
                this.setState({measures_data: json})
            })
            .catch((error) => console.error(error))
        let coms_url = base_url + 'comunicazioni/' + this.state.username + '/'
        fetch(coms_url, {method:'GET', headers: headers})
            .then((response) => response.json())
            .then((json) => {
                this.setState({communications_data: json})
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false})
            });
            })

    }

    render() {

        const data_segnalazione = (type, data)=>{
            let segnalazione = new Date(data)
            let giorno = segnalazione.getDate()
            let mese = segnalazione.getMonth() + 1
            let anno = segnalazione.getFullYear()
            segnalazione = type + " del " + giorno + "/" + mese + "/" + anno
            return segnalazione
        }

        const already_read = (already_read_by)=>{
            return !!already_read_by.includes(this.state.username)
        }

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
                            SEGNALAZIONI DISCIPLINARI
                        </Text>
                         {this.state.measures_data.length <= [] ?
                            <Text style={{flex: 1, fontSize: 18, color: '#ff8000', textAlign:'center'}}>
                                <FontAwesomeIcon style={{color: '#ff8000'}} icon={ faThumbsUp }/>&nbsp; Per ora tutto bene!
                            </Text> : (
                        <FlatList
                            data={this.state.measures_data}
                            renderItem={({item}) => <DisciplinaryMeasure
                                            measure_date = {data_segnalazione("Segnalazione", item.reporting_date)}
                                            note = {item.motivation}
                                            teacher = {item.teacher}
                                            tutor ={item.tutor}
                                            students_n = {item.students_n}
                                            measure = {item.humanized_note_type}
                                            measure_id = {item.id}
                                            already_read = {already_read(item.already_read_by)}
                                            username = {this.state.username}
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


