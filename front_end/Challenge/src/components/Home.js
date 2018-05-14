import React from 'react';

import { View, Text, TextInput, StyleSheet, TouchableOpacity , AsyncStorage } from 'react-native';

import {Actions} from 'react-native-router-flux';

class Home extends React.Component{
    state = { name: '' };
    STORAGE_NAME = "u_name";

    componentWillMount(){
        //Check if has name
        AsyncStorage.getItem(this.STORAGE_NAME).then((value) => {
            if(value != undefined){
                Actions.chat({name: value})
            }
        }).done();
    }

    render() {
        return(
            <View>
                <Text style={styles.title}>
                    Chatbot: Challenge Taylor
                </Text>

                <Text style={styles.name_text}>
                    Nickname:
                </Text>

                <TextInput 
                    style={styles.nameInput}
                    placeholder='Sr Biscoito'
                    onChangeText={(value)=>{
                        //Update state on change value
                        this.setState({name: value});
                    }}
                    value={this.state.name}
                />
                
                <TouchableOpacity onPress={() =>{
                    //Save name
                    AsyncStorage.setItem(this.STORAGE_NAME, this.state.name).done(
                        //Send data to the next page 
                        Actions.chat({name: this.state.name})
                    );
                }}>
                    <Text style={styles.button}>
                        Enter
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    
    title: {
        margin:20,
        fontSize: 22,
        alignSelf: 'center'
    },
    name_text: {
        marginLeft:20,
        marginTop:20,
        fontSize: 20
    },
    nameInput:{
        height: 40,
        borderWidth: 1,
        borderColor: 'blue',
        margin: 10,
        borderRadius: 2
    },
    button: {
        alignSelf: 'center',
        fontSize: 20
    }
});

export default Home;