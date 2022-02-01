import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {base_url, headers} from "../assets/variabili";
import Text from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedText";
import styles from "../assets/styles";

export default class NameOnHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: '',
            data: [],
            url: '',
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

    componentWillMount() {
        this.getUsername()
        this.getToken()
            .then(() => {
                headers.set('Authorization', 'Token ' + this.state.token)

                let url = base_url + this.state.username + '/'
                fetch(url, {method: 'GET', headers: headers})
                    .then((response) => response.json())
                    .then((json) => {
                        this.setState({data: json})
                    })
                    .catch((error) => console.error(error))
                    .finally(() => this.setState({isLoading: false}));
            })
    }

    render() {
        return (
            <Text>
                {this.state.data.name != null ?
                    <Text style={styles.header}>
                        Ciao {this.state.data.name}!
                    </Text> :
                <Text>Ciao!</Text>}
            </Text>

        )
    }
}
