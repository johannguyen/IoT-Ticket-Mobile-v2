// // Test Switch navigator
// import switchExample from './reactNavigation/switchExample'
// export default switchExample

//Test Switch navigator
// import stackExample from './reactNavigation/stackExample'
// export default stackExample

import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, FlatList, SectionList } from 'react-native'
import {Provider} from 'react-redux'
import {createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation'
import { PersistGate } from 'redux-persist/integration/react'
import LoginScreen from './screens/LoginScreen'
import SettingScreens from './screens/SettingScreen'
import ResourceScreen from './screens/ResourceScreen'
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { AppLoading, Asset, Font } from 'expo';
import {store, persistor} from './store/store'
import DashboardListScreen from './screens/DashboardListScreen';
import DashboardScreen from './screens/DashboardScreen';

const ResourcesTab = createStackNavigator({
    Resources: ResourceScreen,
    DashboardList: DashboardListScreen,
    DashboardWebView: DashboardScreen
},{
    initialRouteName: 'Resources',
    headerLayoutPreset:'center',
    defaultNavigationOptions:{
        headerTintColor: '#008DD2'
    }
});

const ResourcesTabContainer = createAppContainer(ResourcesTab);

ResourcesTabContainer.navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
        <Ionicons name= {"md-contacts"} size={25} color={tintColor}/>
    )
}

const MainNavigator = createBottomTabNavigator({
    Resources: ResourcesTabContainer,
    Settings: SettingScreens
},{
    tabBarOptions:{
        activeTintColor:'#008DD2'
    }
});

const MainContainer = createAppContainer(MainNavigator);

const AppNavigator = createSwitchNavigator({
    Main: MainContainer,
    Login: LoginScreen
},{
    initialRouteName: 'Login',
    headerLayoutPreset:'center'
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
	
  state = {
    contacts: null,
    firstLoad: true,
    lastKey: 0,    
    appIsReady: false
  }

 cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
  }

  _loadAssetsAsync = async () => {
    const fontAssets = this.cacheFonts([FontAwesome.font, MaterialIcons.font, Ionicons.font]);

    await Promise.all([...fontAssets]);
  }
  
  render() {
    if (!this.state.appIsReady){
      return <AppLoading
      startAsync={this._loadAssetsAsync}
      onFinish={() => this.setState({ appIsReady: true })}
      onError={console.warn}
    />
    }
    return (
      <Provider store= {store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer/>
        </PersistGate>
      </Provider>
    );
  }
}