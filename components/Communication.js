import {headers} from "../assets/variabili";
import {Text, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEnvelopeOpen, faPaperPlane} from "@fortawesome/pro-light-svg-icons";
import React from "react";


export default class Communication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            communication_date: props.communication_date,
            date: new Date().toISOString().slice(0, 10),
            subject: props.subject,
            content: props.content,
            created_at: props.created_at,
            username: props.username,
            read: props.read,
            student: props.student,
        }
    }

    communication_read = (id) => {
        headers.set('Content-Type', 'application/json' )
        let post_url = 'https://gestionalecfp.herokuapp.com/anagrafica/api/studenti/comunicazioni/' + this.state.username + "/" + this.state.id + "/"
        fetch(post_url, {
            method: 'PUT',
            body: JSON.stringify({
                subject: this.state.subject,
                content: this.state.content,
                created_at: this.state.created_at,
                read_by_family: true,
                date_of_reading: this.state.date,
                student: this.state.student,
            }),
            headers: headers,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({'read': true})
            })
            .finally(()=> this.setState({'read': true}))
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
                <Text style={{fontSize: 15}}>{this.state.communication_date}{'\n'}</Text>
                <Text style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        flex: 1,
                }}>
                    {'\n'}
                    {this.state.subject}
                    {'\n\n'}
                </Text>
                <Text style={{
                        fontSize: 12,
                        flex: 1,
                }}>
                    {this.state.content}
                </Text>

                {'\n\n'}

                {this.state.read === true ?
                    <Text style={{color: 'green'}}>
                        <FontAwesomeIcon style={{color: 'green', marginRight: 5}}
                                         size={10}
                                         icon={ faEnvelopeOpen } />
                        &nbsp;Comunicazione già letta
                    </Text>
                    :(
                        <TouchableOpacity onPress={this.communication_read}>
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
