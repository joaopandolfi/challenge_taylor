import React from 'react';
//import AppRegistry from 'react-native'

import Home from './components/Home';
import Chat from './components/Chat';

import { Router, Scene } from 'react-native-router-flux';

import {Platform} from 'react-native';

export default class Ctapp extends React.Component {
    render(){
        return(
            <Router>
                <Scene key='root' style={{marginTop:20 ,paddingTop: Platform.OS === "ios" ? 65 : 55 }}>
                    <Scene key='home' title='Home' component={Home} />
                    <Scene key='chat' title='Chatbot Challenge' component={Chat} />
                </Scene>
            </Router>
        );
    }
}