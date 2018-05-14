const functions = require('firebase-functions');
const admin = require('firebase-admin');
var test = require("./etc/test.js")
var message = require("./etc/message.js")

admin.initializeApp();

exports.chatbot = functions.database.ref('/messages/{userid}/{pushid}')
    .onWrite((snapshot) => {
      const original = snapshot.after.val();

      //User Message only
      if(original.response === 0){
        console.log(original.text);

        //Process message
        return message.receive(original.text,(response)=>{
          //Set Responded
          original.response = 1;
          snapshot.after.ref.set(original);

          //debug
          console.log(response);

          //Make response
          return  snapshot.after.ref.parent.push({
            text: response,
             response: 1,
             createdAt:admin.database.ServerValue.TIMESTAMP,
             user: {_id: "Chatbot",name:"Bot" }
           });
        })
      }
      return 0;
    });

exports.testurl = functions.https.onRequest(test.url)


//exports.message = functions.http.onRequest(message.receive)
