import {Header} from "react-native-elements";
import React from "react";
import {Image} from "react-native";
import NameOnHeader from "./NameOnHeader";

const AppHeader = (navigation) => {
    const renderLogo = () => {
          return(
              <Image
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                  source={require('../assets/headerlogo.png')}
              />

          );
      };

    return(

        <Header
            containerStyle={{
                backgroundColor: '#00b8cf',
                justifyContent: 'center',
            }}
            leftComponent={() => renderLogo()}
            centerComponent={{}}
            rightComponent={{}}
        />
    );
};


export default AppHeader;
