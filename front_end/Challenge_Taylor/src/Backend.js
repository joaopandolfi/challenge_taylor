import firebase from 'firebase';
import {AsyncStorage} from 'react-native';

class Backend{
    uid = '';
    messagesPointer = null;

    constructor(){
        firebase.initializeApp({
            apiKey: 'AIzaSyCekijvgJ0VLx8OxSQYsVxvBu__FB2hW2s',
            authDomain: 'challenge-b48be.firebaseapp.com',
            databaseURL: 'https://challenge-b48be.firebaseio.com',
            storageBucket: 'challenge-b48be.appspot.com',
          });

          firebase.auth().onAuthStateChanged((credentials) => {
            if (credentials) {
              this.setUid(credentials.uid);
            } else {
              firebase.auth().signInAnonymously().catch((error) => {
                alert(error.message);
              });
            }
          });
    }

    //Mudar
    sendMessage(message){
        for (let i = 0; i < message.length; i++) {
            this.messagesPointer.push({
              text: message[i].text,
              user: message[i].user,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
          }
    }

    //Mudar
    loadAllMessages(callback){
        this.messagesPointer = firebase.database().ref('messages');
        this.messagesPointer.off();
        const onReceive = (data) => {
          const message = data.val();
          callback({
            _id: data.key,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.user._id,
              name: message.user.name,
            },
          });
        };
        this.messagesPointer.limitToLast(20).on('child_added', onReceive);
    }

    //Mudar
    end(){
        if (this.messagesPointer) {
            this.messagesPointer.off();
          }
    }

    setUid(value) {
        this.uid = value;
    }

    getUid() {
        return this.uid;
    }
}

export default new Backend();