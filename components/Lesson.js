import {headers} from "../assets/variabili";
import {Text, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEnvelopeOpen, faPaperPlane} from "@fortawesome/pro-light-svg-icons";
import React from "react";
import {Divider} from "react-native-elements";
import View from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedView";


export default class Lesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            readable_uf: props.readable_uf,
            teacher: props.teacher,
            day: props.day,
            hour: props.hour,
            day_has_changed: props.day_has_changed,

        }
    }

    render() {
        return (
                <>
                    {this.state.day_has_changed === true ?
                        <Text style={{
                            flex:1,
                            width: '100%',
                            marginTop: 10,
                            borderBottomColor: '#808080',
                            borderBottomWidth: 1,
                            backgroundColor: '#f2fbfd',
                            padding: 5,
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#007887',
                                textTransform: "uppercase",
                            }}>
                                {this.state.day}
                            </Text>
                        </Text>
                        : null}

                <Text style={{
                    flex:1,
                    width: '100%',
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                    paddingHorizontal: 5,
                }}>
                    <Text style={{flex:1}}>
                        <Text style={{fontSize: 11}}>{this.state.hour}&nbsp;&nbsp;|&nbsp;&nbsp;</Text>
                    </Text>
                    <Text style={{flex:1}}>
                        <Text style={{fontSize: 11}}>{this.state.readable_uf}&nbsp;&nbsp;|&nbsp;&nbsp;</Text>
                    </Text>
                    <Text style={{flex:1}}>
                        <Text style={{fontSize: 11}}>{this.state.teacher}</Text>
                    </Text>
                </Text>
                </>
        )
    }
}


