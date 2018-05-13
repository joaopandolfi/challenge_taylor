import React from 'react';

import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import {Actions} from 'react-native-router-flux';

class Home extends React.Component{
    state = { name: '' };
    render() {
        return(
            <View>
                <Text style={styles.title}>
                    Name:
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
                    //Send data to the next page 
                    Actions.chat({name: this.state.name})
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
        fontSize: 20
    },
    nameInput:{
        height: 40,
        borderWidth: 1,
        borderColor: 'blue',
        margin: 10
    },
    button: {
        alignSelf: 'center',
        fontSize: 20
    }
});

export default Home;