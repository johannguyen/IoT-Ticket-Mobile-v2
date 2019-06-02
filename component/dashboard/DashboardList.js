import React from 'react'
import {SectionList, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import DashboardRow from './DashboardRow'

export default class DashboardList extends React.Component{

    renderItem = ({item}) => <DashboardRow {...item} onSelectContact={this.props.onSelectContact}/>

    renderSectionHeader = obj => {
        return(
            <View style={{flexDirection: "row"}}>                
                <Text style={{fontSize: 30, color:'#f1f1f1'}}>{obj.section.title}</Text>
                <View style={{backgroundColor: "#f1f1f1", height: 1, flex: 1, alignSelf: "center", marginLeft:10, opacity: 0.45, marginTop:5}}></View>
            </View>
        )
    }
    render(){
        return(
            <SectionList 
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                sections={this.props.dashboards}
            />
        )
    }
}