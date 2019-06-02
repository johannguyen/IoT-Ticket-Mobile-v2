import React from 'react'
import { Text, View, Dimensions, ScrollView } from 'react-native'

import TreeView from '../component/TreeView'
import {connect} from 'react-redux'
import {Constants} from 'expo'
import {getResources} from '../store/actions'
import { MaterialIcons} from '@expo/vector-icons';
import Loading from '../component/Loading'

const fontSize = 25;
const color = '#fff';

class ResourceScreen extends React.PureComponent {
    static navigationOptions = ({navigation}) => ({
        title:'Resources',
        headerTitleStyle : {width : Dimensions.get('window').width}
    });

    state = {
        firstLoad: true,
    }

    static getDerivedStateFromProps(props, state) {
        if (props.resourcesErr !== state.resourcesErr) {
            return {
                resourcesErr: props.resourcesErr,
            };
        }
        return null;
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (!(this.props.resourcesErr === null)) {
            this.props.navigation.navigate('Login');
        }
    }

    componentDidMount() {
        this.getResources();
    }

    getResources = async () => {
        let force = false;
        if(this.state.firstLoad){
            force = true;
        }
        this.props.getResources(force, this.props.resources);
        this.setState({firstLoad: false});
    }

    renderTypeIcon = resourceType => {
        switch(resourceType){
            case "Enterprise":
                return <MaterialIcons color={color} name="domain" size={fontSize}/>;
            case "Site":
                return <MaterialIcons color={color} name="equalizer" size={fontSize}/>;
            case "Asset":
                return <MaterialIcons color={color} name="storage" size={fontSize}/>;
            case "Device":
                return <MaterialIcons color={color} name="developer-board" size={fontSize}/>;
            default:
                return <MaterialIcons color={color} name="domain" size={fontSize}/>;
        }
    }
    
    renderStatusIcon = collapsed  => {
        if(collapsed !== null){
            if(collapsed){
                return <MaterialIcons color={color} name="keyboard-arrow-right" size={fontSize}/>;
            }
            else{
                return <MaterialIcons color={color} name="keyboard-arrow-down" size={fontSize}/>;
            }
        }
        else{
            return;
        }
    }

    render() {
        // console.log(this.props.loading);
        if(this.props.loading || !this.props.resources){
            return (<Loading text='Loading ...'/>);
        }
        else{
            return (
                <ScrollView style={{backgroundColor:'#064D6F'}}>
                    <TreeView
                    ref={ref => (this.treeView = ref)}
                    data={this.props.resources}
                    expandAll={true}
                    onItemPress={(node, level) => {
                        let obj = {};
                        obj.id = node.id;
                        obj.name = node.name;
                        this.props.navigation.navigate('DashboardList', {
                            resource: obj
                        });
                    }}
                    renderItem={(item, level) => {
                        let addMargin = item.collapsed!==null? 0:25;
                        addMargin = addMargin + (25 * level);
                        return(
                            <View 
                                style={{
                                marginLeft: addMargin,
                                fontSize: fontSize,
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                {this.renderStatusIcon(item.collapsed)}
                                {this.renderTypeIcon(item.resourceType)}
                                <Text style={{color:color, marginLeft: 5}}>{item.name}</Text>
                            </View>
                        )}}
                    />
                </ScrollView>
            )
        }
    }
}

const mapStateToProps = state => ({
    resources: state.resources.data,
    loading: state.resources.loading,
    resourcesErr: state.resources.loadResourceErr
})

export default connect(mapStateToProps,{getResources})(ResourceScreen)