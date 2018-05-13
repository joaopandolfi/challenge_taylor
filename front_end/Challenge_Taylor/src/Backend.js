import firebase from 'firebase';
import {AsyncStorage} from 'react-native';

class Backend{
    //consts
    STORAGE_MESSAGES = "messages";
    STORAGE_UID = "uid";

    uid = '';
    messagesPointer = null;
    savedMessages = [];

    constructor(){
        //Initializing firebase
        firebase.initializeApp({
            apiKey: 'AIzaSyCekijvgJ0VLx8OxSQYsVxvBu__FB2hW2s',
            authDomain: 'challenge-b48be.firebaseapp.com',
            databaseURL: 'https://challenge-b48be.firebaseio.com',
            storageBucket: 'challenge-b48be.appspot.com',
            //persistence: true
          });

          //Getting Auth
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
        this.initializeFirebase();
        
        this.loadSavedMessages(()=>{

            //On receive
            const onReceive = (data) => {
                const message = data.val();
                var formated = {
                    _id: data.key,
                    text: message.text,
                    createdAt: new Date(message.createdAt),
                    user: {
                        _id: message.user._id,
                        name: message.user.name,
                    }
                }

                //Local Save Messages
                this.saveMessage(formated);
                callback(formated);
            };

            this.messagesPointer.limitToLast(20).on('child_added', onReceive);   
        })
    }

    
    end(){
        if (this.messagesPointer) this.messagesPointer.off();
    }

    initializeFirebase(){
        this.messagesPointer = firebase.database().ref('messages');
        this.messagesPointer.off();
    }

    
    // Local Storage
    loadSavedMessages(callback){
        AsyncStorage.getItem(this.STORAGE_MESSAGES).then((value) => {
            if(value == undefined) AsyncStorage.setItem(this.STORAGE_MESSAGES,[]);
            else this.setNewMessage(value);
        }).done(callback());
    }

    //Save message on Local Storage
    saveMessage(message){

        //Search message on buffer
        let found = this.savedMessages.find((m)=>{
            if(m)
                return m._id === message.id;
        });

        //Save new message on storage
        if(found == undefined){
            this.setNewMessage(message);
            AsyncStorage.setItem(this.STORAGE_MESSAGES, this.savedMessages);
        }
    }

    //Gets and Setters

    setUid(value) {
        this.uid = value;
    }

    getUid() {
        return this.uid;
    }

    setNewMessage(message){
        if (!Array.isArray(this.savedMessages)) this.savedMessages = [this.savedMessages];
        this.savedMessages.concat(message);
    }
}

export default new Backend();