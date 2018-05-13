import firebase from 'firebase';
import {AsyncStorage} from 'react-native';

class Backend{
    //consts
    STORAGE_MESSAGES = "messages";
    STORAGE_UID = "uid";
    FIREBASE_MESSAGES= "messages";

    //Variables
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
         
          //Get stored Uid
          AsyncStorage.getItem(this.STORAGE_UID).then((value) => {
            if(value != undefined) this.setUid(value);   
          });
    }

    initialize(callback){
        //AsyncStorage.setItem(this.STORAGE_MESSAGES,JSON.stringify([]));
        this.loadSavedMessages(()=>{
            this.savedMessages.forEach((message)=>{
                callback(message)
            })
            this.localLoaded = true;
        });
    
        this.initializeFirebaseAuth(()=>{
            this.loadServerMessages(callback);
        });
    }


    
    initializeFirebaseAuth(callback){
        //Getting Auth
        firebase.auth().onAuthStateChanged((credentials) => {
            if (credentials) this.setUid(credentials.uid);
            else {
                firebase.auth().signInAnonymously().catch((error) => {
                    alert(error.message);
                });
            }
            callback();
        });
    }

    
    //Initialize FirebaseDb
    initializeFirebaseDb(){
        this.messagesPointer = firebase.database().ref(this.FIREBASE_MESSAGES+"/"+this.uid);
        this.messagesPointer.off();
    }


    //Mudar
    sendMessage(message){
        for (let i = 0; i < message.length; i++) {
            this.messagesPointer.push({
              text: message[i].text,
              user: message[i].user,
              response: 0,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
          }
    }

    //Load messages from firebase
    loadServerMessages(callback){
        this.initializeFirebaseDb();

        //On receive
        const onReceive = (data) => {

            let message = data.val();
                let formated = {
                    _id: data.key,
                    text: message.text,
                    response: message.response,
                    createdAt: new Date(message.createdAt),
                    user: {
                        _id: message.user._id,
                        name: message.user.name
                    }
                }
                //Local Save Messages
                if(this.saveMessage(formated)) callback(formated);
        };

        this.messagesPointer.limitToLast(20).on('child_added', onReceive);   
    }

    
    end(){
        if (this.messagesPointer) this.messagesPointer.off();
    }

    // ===
    
    // Local Storage
    loadSavedMessages(callback){
        AsyncStorage.getItem(this.STORAGE_MESSAGES).then((value) => {
            if(value != null && value != undefined) this.setNewMessage(JSON.parse(value));
            else  AsyncStorage.setItem(this.STORAGE_MESSAGES,JSON.stringify([]));
            callback();
        }).done();
    }

    //Save message on Local Storage
    saveMessage(message){
        console.log(message)
        //Search message on buffer
        let found = this.savedMessages.find((m)=>{
            if(m)
                return m._id === message._id;
        });

        //Save new message on storage
        if(found == undefined){
            this.addNewMessage(message);
            AsyncStorage.setItem(this.STORAGE_MESSAGES, JSON.stringify(this.savedMessages));
            return true;
        }
        return false;
    }

    //Gets and Setters

    setUid(value) {
        this.uid = value;
        AsyncStorage.setItem(this.STORAGE_UID, this.uid);
    }

    getUid() {
        return this.uid;
    }

    addNewMessage(message){
        this.savedMessages = this.savedMessages.concat(message);
    }

    setNewMessage(messages){
        this.savedMessages =  messages.concat();
    }
}

export default new Backend();