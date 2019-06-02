import React from 'react'
import {Button, View, StyleSheet, Text, Dimensions, TextInput, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {Constants} from 'expo'
import {loginUser, checkLogin} from '../store/actions'
import PropTypes from 'prop-types'
import Loading from '../component/Loading'

class LoginScreen extends React.Component{
    static propTypes = {
        err: PropTypes.string,
        loginUser: PropTypes.func
    }
    state = {
        username:"",
        password:""
    }

    login = async () =>{
        this.props.loginUser(this.buildOptions());
    }

    static getDerivedStateFromProps(props, state) {
        // console.log(props);
        // console.log('derived called');
        if (props.logedIn !== state.logedIn) {
            // console.log('return not null');
            return {
                logedIn: props.logedIn,
            };
        }
    
        // Return null if the state hasn't changed
        return null;
    }
    
    componentDidUpdate(prevProps, prevState) {
        // console.log('component did update ' + this.props.logedIn);
        if (this.props.logedIn === true) {
            this.props.navigation.navigate('Main');
        }
    }

    componentDidMount(){
        this.checkLogin();
    }

    checkLogin = async () => {
        // console.log('check login called'); 
        this.props.checkLogin();
    }

    handleUsernameUpdate = username => {
        this.setState({username});
    }

    handlePasswordUpdate = password => {
        this.setState({password});
    }

    buildOptions = () => {
        return {
            username: this.state.username,
            password: this.state.password,
            grant_type: 'password'
        }
    }

    render () {
        if(this.props.loading){
            return (<Loading text='Verify authentication ...'/>);
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.error}>{this.props.err}</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.input} placeholder="Username" value = {this.state.username} onChangeText={this.handleUsernameUpdate}/>
                </View>
                <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry value = {this.state.password} onChangeText={this.handlePasswordUpdate}/>
                </View>
                <View style={{width: Dimensions.get('window').width}}><Button title="Login" color = "#008DD2" onPress={this.login}/></View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    err: state.user.loginErr,
    logedIn: state.user.logedIn,
    loading: state.user.loading
})

export default connect(mapStateToProps,{loginUser, checkLogin})(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent:'center',
        paddingTop: Constants.statusBarHeight + 20
    },
    inputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20
    },
    input:{
        flex: 1,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        borderColor: 'black',
        borderBottomWidth: 1
    },
    text: {
        textAlign: 'center'
    },
    error: {
        textAlign: 'center',
        color: 'red',
    }
});

// import React, { Component } from 'react';
// import {
//   WebView,
// } from 'react-native';

// class LoginScreen extends Component {
//   state = {
//     cookies    : {},
//     webViewUrl : ''
//   }

//   onNavigationStateChange = (webViewState) => {
//     const { url } = webViewState;

//     // when WebView.onMessage called, there is not-http(s) url
//     if(url.includes('https')) {
//         console.log(url);
//       this.setState({ webViewUrl: url })
//     }
//   }

//   _checkNeededCookies = () => {
//     const { cookies, webViewUrl } = this.state;

//     if (webViewUrl === 'https://qa-dmz.iot-ticket.com/Dashboard/') {
//       if (cookies['ZSSESSID']) {
//         alert(cookies['ZSSESSID']);
//         // do your magic...
//       }
//     }
//   }

//   _onMessage = (event) => {
//       console.log('on mesasge called');
//     const { data } = event.nativeEvent;
//     const cookies  = data.split(';'); // `csrftoken=...; rur=...; mid=...; somethingelse=...`

//     cookies.forEach((cookie) => {
//       const c = cookie.trim().split('=');

//       const new_cookies = this.state.cookies;
//       new_cookies[c[0]] = c[1];

//       this.setState({ cookies: new_cookies });
//     });

//     this._checkNeededCookies();
//   }

//   render() {
//     const jsCode = "console.log('injected code called');window.postMessage(document.cookie)"
//     // let jsCode = "window.postMessage(document.cookie= 'login=; expires=Bla bla bla')"; // if you need to write some cookies, not sure if it goes to shared cookies, most probably no :)

//     return (
//       <WebView
//         source={{ uri: 'https://qa-dmz.iot-ticket.com/uaa/login' }}
//         onNavigationStateChange={this.onNavigationStateChange}
//         onMessage={this._onMessage}
//         injectedJavaScript={jsCode}
//         style={{ flex: 1 }}
//       />
//     );
//   }
// }

// export default LoginScreen;
