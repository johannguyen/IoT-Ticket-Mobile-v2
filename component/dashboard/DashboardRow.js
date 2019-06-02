import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';

export default class DashboardRow extends React.Component {
    render(){
        return (
            <TouchableOpacity style={styles.dashBoardList} onPress={()=>{this.props.onSelectContact(this.props)}}>
                <View>
                    <Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>{this.props.title}</Text>
                    <View style={{flexDirection:'row', alignItems: "center"}}>
                        <MaterialIcons color='#9bb8c5' name="account-circle"/>
                        <Text style={{color:'#9bb8c5', marginLeft:5}}>{this.props.createdBy}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems: "center"}}>
                        <MaterialIcons color='#9bb8c5' name="date-range"/>
                        <Text style={{color:'#9bb8c5', marginLeft:5}}>{this.props.lastEdit}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    dashBoardList:{
      flex: 1,
      padding: 20,
      height: 110,
      marginBottom: 10,
      marginTop:10,
      borderLeftWidth: 2,
      borderLeftColor:'#008DD2',
      backgroundColor: '#125676'
    }
});

/* Another way
const Row = props =>{
    
    const styles = StyleSheet.create({
        phoneList:{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }
    });
    return (
        <View style={styles.phoneList}>
          <Text>{props.name}</Text>
          <Text>{props.phone}</Text>
        </View>
    )
}

export default Row
*/