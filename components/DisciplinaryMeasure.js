import {headers} from "../assets/variabili";
import {Text, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEnvelopeOpen, faPaperPlane} from "@fortawesome/pro-light-svg-icons";
import React from "react";
import {Divider} from "react-native-elements";


export default class DisciplinaryMeasure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            measure_date: props.measure_date,
            note: props.note,
            teacher: props.teacher,
            tutor: props.tutor,
            students_n: props.students_n,
            measure: props.measure,
            measure_id: props.measure_id,
            already_read: props.already_read,
            username: props.username,
        }
    }

    note_read = (id) => {
        headers.set('Content-Type', 'application/json' )
        let post_url = 'https://gestionalecfp.herokuapp.com/anagrafica/api/studenti/note/' + this.state.username + "/" + this.state.measure_id + "/check/"
        fetch(post_url, {
            method: 'PUT',
            body: JSON.stringify({ measure: this.state.measure_id, student: this.state.username }),
            headers: headers,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({'already_read': true})
            })
            .catch(error => console.log(error.message))
            .finally(()=> this.setState({'already_read': true}))
    }

    render() {
        return (
            <Text style={{
                fontSize: 12,
                flex: 1,
                borderBottomColor: '#808080',
                borderBottomWidth: 1,
                marginBottom: 20,
            }}>
                <Text style={{fontSize: 15}}>{this.state.measure_date}{'\n\n'}</Text>
                {this.state.teacher !== '' ? <Text>Docente: {this.state.teacher} {'\n'}</Text>: null}
                {this.state.tutor !== '' ? <Text>Tutor: {this.state.tutor} {'\n'}</Text>: null}
                <Text>Studenti coinvolti: {this.state.students_n} {'\n\n'}</Text>

                {this.state.note} {'\n\n'}

                {this.state.measure === 'Sospensione' || this.state.measure === 'Colloquio con preside' ?
                    <Text style={{color:'red'}}>Provvedimento: {this.state.measure}</Text>
                    : <Text style={{color:'#00b8cf'}}>Provvedimento: {this.state.measure}</Text>}

                {'\n\n'}

                {this.state.already_read === true ?
                    <Text style={{color: 'green'}}>
                        <FontAwesomeIcon size={10}
                                         icon={ faEnvelopeOpen } />
                        &nbsp;Segnalazione già letta
                    </Text>
                    :(
                        <TouchableOpacity activeOpacity={0.5} onPress={this.note_read}>
                            <Text style={{
                                color: 'red',
                                backgroundColor: '#f8d7da',
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: 'red',
                                paddingVertical: 5,
                                paddingHorizontal: 10,

                            }}>
                                <FontAwesomeIcon style={{color: 'red', marginRight: 5}}
                                                 size={10}
                                                 icon={ faPaperPlane } />
                                &nbsp;Invia conferma di lettura
                            </Text>
                        </TouchableOpacity>
                    )
                }
                {'\n\n'}
            </Text>
        )
    }
}
