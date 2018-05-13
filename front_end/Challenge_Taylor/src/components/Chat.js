import React from 'react';
import PropTypes from 'prop-types';

import{GiftedChat} from 'react-native-gifted-chat';

class Chat extends React.Component{
    state = {
        messages = []
    };

    render() {
        return(
           <GiftedChat
           messages={this.state.messages}
           onSend={(message)=>{
               //Send to backend
           }} 

           user={{ _id=1 }}
           />
        );
    }
}

//Defining default data
Chat.defaultProps = {name: 'Anonymus'};

Chat.propTypes = { name: PropTypes.string };

export default Chat;