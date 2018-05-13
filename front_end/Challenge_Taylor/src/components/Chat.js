import React from 'react';
import PropTypes from 'prop-types';

import{GiftedChat} from 'react-native-gifted-chat';

import Backend from '../Backend';

class Chat extends React.Component{
    state = {
        messages : []
    };

    //Before all
    componentWillMount(){

    }

    render() {
        return(
           <GiftedChat
           messages={this.state.messages}
           onSend={(message)=>{
               //Send to backend
               Backend.sendMessage(message);
           }} 

           user={{  
               _id: Backend.getUid(),
               name: this.props.name
            }}
           />
        );
    }

    //Mounting
    componentDidMount() {
       Backend.loadAllMessages((message) => {
          this.setState((previousState) => {
            return {
              messages: GiftedChat.append(previousState.messages, message),
            };
          });
        });
      }

      //Close
      componentWillUnmount() {
        Backend.end();
      }
}

//Defining default data
Chat.defaultProps = {name: 'Anonymus'};

Chat.propTypes = { name: PropTypes.string };

export default Chat;