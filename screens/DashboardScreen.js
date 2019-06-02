import React from 'react'
import {Button, Text, WebView, Dimensions} from 'react-native'
import {Constants} from 'expo'

export default class DashboardScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.getParam('resourceName'),
        headerTitleStyle : {width : Dimensions.get('window').width}
    });

    render(){
        const dashboard = this.props.navigation.getParam('dashboard');
        const type = dashboard.type;
        let url = "https://qa-dmz.iot-ticket.com/Dashboard/";
        if(type === 'desktop'){
            url += `#desktop/${dashboard.id}`;
        }
        else{
            url += `#report/${this.props.navigation.getParam('resourceId')}/${dashboard.id}`
        }
        return(
            <WebView
                source={{uri: url}}
            />
        )
            
    }
}