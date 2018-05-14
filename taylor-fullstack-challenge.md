# Details
Build a chat interface with a simple chatbot service to send **text messages** and **commands** using React Native & NodeJS.

* The text messages must return a random message from the service;
* The commands must return specific data from the Ethereum blockchain (testnet Rinkeby).

## Available commands
* `/getTx`: Given a txHash, return the transaction info;
* `/getBalance`: Given the wallet address, return the available balance (for all tokens in the wallet);

## Examples
### Example 1: Command `getTx`

#### Input
`/getTx 0xdbb0eef96b486855675f95cb04344efb1780c9b418b5f9ffb61cfc48369c2abe`

#### Return

```
* Status: Success
* Block Height: 1805038
* TimeStamp: 22 days 4 hrs ago (Feb-20-2018 04:52:33 PM +UTC)
* From: 0x2d70acc3c8f5a4b992e3cc8e52628a508b392b2b
* To: 0xe2a55b135ca9866faeab9ab981a5057d91ebca14
* Value: 0 Ether
* Gas Limit: 100000
* Gas Used By Txn: 44438
* Gas Price: 0.00000002 Ether (20 Gwei)
```

### Example 2: Custom message

#### Input

`Helo world`

#### Return

`Any random text message`

# Requirements

* Use React Native for front-end;
* Use NodeJS for back-end;
* Use Firebase Real-time Database to log all inputs and returns;
* Use Firebase Functions to execute the commands `getTx` and `getBalance`;
* Whenever the app goes offline, it should keep the chat history;
* Have a clean and well-documented code;
* Handle errors properly.

# Nice to have

* A new command `/watch` through which given the wallet address will show the transactions (IN and OUT) in real-time;
* In case of a command while the app is offline, the latest result of the same command (including parameters) must be returned. If the command was not used before, return an error message;
* Unit tests;

# How to deliver

* You must deliver the code using [Github](github.com)
* You must send a builded version of the mobile app for Android (`.APK`)
* You must host the back-end in any cloud service so that the mobile app will work without any deploy