import React from 'react'
import {View, Button} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {logoutAction} from '../store/actions'
import {connect} from 'react-redux'

class SettingScreen extends React.Component{
    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => (
            <Ionicons name= {"md-settings"} size={25} color={tintColor}/>
        )
    };
    logout = async () => {
        await this.props.logoutAction();
        this.props.navigation.navigate("Login");
    }
    render(){
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Button title = "Log out " color = "#008DD2" onPress={this.logout}/>
            </View>
        )
    }
}

export default connect(null,{logoutAction})(SettingScreen)