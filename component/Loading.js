import React, { Component } from 'react'
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View} from 'react-native'

export default class Loading extends Component {
  render() {
    return (
      <View style={{flex:1, flexDirection: 'row', backgroundColor:'#fff', alignItems: 'center', justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#008DD2" />
        <Text style={{color:'#008DD2', fontSize:30, marginLeft:10}}>{this.props.text}</Text>
      </View>
    )
  }
}