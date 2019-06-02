import React from 'react'
import {Button, Text, View, Dimensions, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {getDashboards} from '../store/actions'
import DashboardList from '../component/dashboard/DashboardList';
import {Constants} from 'expo'
import Loading from '../component/Loading'

class DashboardListScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.getParam('resource').name,
        headerTitleStyle : {width : Dimensions.get('window').width}
    });

    static getDerivedStateFromProps(props, state) {
        if (props.dashboardErr !== state.dashboardErr) {
            return {
                dashboardErr: props.dashboardErr,
            };
        }
        return null;
    }

    state = {
        firstLoad:false
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (!(this.props.dashboardErr === null)) {
            this.props.navigation.navigate('Login');
        }
    }

    componentDidMount() {
        this.getDashboards();
    }

    getDashboards = async () => {
        const resourceId = this.props.navigation.getParam('resource').id;
        //console.log(resourceId);
        this.props.getDashboards(resourceId);
    }

    render(){
        if(this.props.loading || !this.props.dashboards){
            return (<Loading text="Loading ..."/>);
        }
        return(
            <View style={styles.container}>
              <DashboardList dashboards={this.props.dashboards} onSelectContact={(dashboard) => {
                  this.props.navigation.navigate('DashboardWebView', {
                      dashboard: dashboard,
                      resourceId: this.props.navigation.getParam('resource').id,
                      resourceName: this.props.navigation.getParam('resource').name
                  });
              }}/>
            </View>
        )
            
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#064D6F',
      padding:10
    }
});

const mapStateToProps = state => ({
    dashboards: state.dashboards.data,
    loading: state.dashboards.loading,
    dashboardErr: state.dashboards.loadDashboardErr
})

export default connect(mapStateToProps,{getDashboards})(DashboardListScreen)