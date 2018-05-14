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

    /*
    * Constructor method
    */
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

    /*
    * Initialize Backend
    * @param callback (Callback function after load stored messages and initialize Firebase)
    */
    initialize(callback){
        this.loadSavedMessages(()=>{
            this.savedMessages.forEach((message)=>{
                if(message) callback(message)
            })
            this.localLoaded = true;
        });
    
        this.initializeFirebaseAuth(()=>{
            this.loadServerMessages(callback);
        });
    }

    /*
    * Initialize Firebease Auth
    * @param callback (Callback function after initilize Firebase Auth)
    */
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

    
    /*
    * Initialize Firebease Db
    */
    initializeFirebaseDb(){
        this.messagesPointer = firebase.database().ref(this.FIREBASE_MESSAGES+"/"+this.uid);
        this.messagesPointer.off();
    }


    /*
    * Send message to Firebase Db
    * @param message (Message to send) {text:(String), user: { _id: (hash), name: (String)}}
    */
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

    /*
    * - Load Firebase Messages and format to UI
    * - Save messages on local storage
    * @param callback (callback function to send formated message)
    */
    loadServerMessages(callback){
        this.initializeFirebaseDb();

        //On receive
        const onReceive = (data) => {
            try {
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
            } catch (error) {
                console.log("Erro na mensagem")
                console.log(error)
            }
            
        };

        //Ser "trigger" on firebase db
        this.messagesPointer.limitToLast(20).on('child_added', onReceive);   
    }

    
    /*
    * End cycle
    */
    end(){
        if (this.messagesPointer) this.messagesPointer.off();
    }

    // === Local Storage Functions ===
    
    /*
    * Load all saved Messages on Local Storage
    * @param callback (callback functin after load messages)
    */
    loadSavedMessages(callback){
        AsyncStorage.getItem(this.STORAGE_MESSAGES).then((value) => {
            if(value != null && value != undefined) this.setNewMessage(JSON.parse(value));
            else  AsyncStorage.setItem(this.STORAGE_MESSAGES,JSON.stringify([]));
            callback();
        }).done();
    }

    /*
    * - Save message on local storage
    * - Check if message is already on buffer
    * @param message (Message to Save) {_id:(String), text:(String), user: { _id: (hash), name: (String)}}
    * */
    saveMessage(message){
        
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

    //Set uid and Save on Local Storage
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