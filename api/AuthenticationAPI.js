const cheerio = require('react-native-cheerio');
import {fetchResource} from './ResourceAPI'

export const login = async (opts) =>{
    const fetchCSRFResponse = await fetch('https://qa-dmz.iot-ticket.com/uaa/login', {credentials: "include"});
    const header = await fetchCSRFResponse.headers;
    // console.log(header);
    const htmlString = await fetchCSRFResponse.text();
    const $ = await cheerio.load(htmlString);
    const csrfField = $("#csrf_token");
    const csrf = csrfField.val();
    // console.log(csrf);
    var formData = new FormData();
    formData.append('username', opts.username);
    formData.append('password', opts.password);
    formData.append('grant_type', 'password');
    formData.append('_csrf', csrf);
    // console.log(formData);
    const response = await fetch('https://qa-dmz.iot-ticket.com/uaa/login',{
        method: 'post',
        credentials: "include",
        body: formData,
        
      });
    //const loginHeader = response.headers;
    // console.log(loginHeader);
    // console.log(response);
    // const getList = await fetch('https://qa-dmz.iot-ticket.com/Dashboard/main/api/tags/E1452?nestedChild=false', {credentials: 'include'});
    // console.log(getList);
    if(response.ok && response.url.includes('Dashboard')){
        return true;
    }

    throw new Error("Username or password is not correct.")
}

export const check = async () => {
    const response = await fetch('https://qa-dmz.iot-ticket.com/Dashboard/main/api/ping', {credentials: "include"});
    // console.log(response);
    if(response.ok && !response.url.includes('uaa/login')){
        return true;
    }
    return false;
}

export const logout = async () =>{
    await fetch('https://qa-dmz.iot-ticket.com/logout', {credentials: "include", method:"post"});
    // console.log(response);
}