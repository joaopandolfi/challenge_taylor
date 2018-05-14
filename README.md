# Challenge Taylor.io

[Desafio](taylor-fullstack-challenge.md) proposto pela Taylor.io

## Conteúdo
- Backend (Firebase Functions)
- Frontend (react-native)


## Configurando
- Instalar [nodejs](https://nodejs.org/en/download/)
- Instalar [react-native](https://facebook.github.io/react-native/docs/getting-started.html)
 

## Executando

### Backend
Navegue até o diretório *back_end/*
```
npm install
firebase deploy
```

### Front
- Configurando
Acesse o arquivo *front_end/Challenge/src/Backend.js*
```
Troque suas credenciais do Firebase

firebase.initializeApp({
	apiKey: 'XXXXXX',
	authDomain: 'XXXX.firebaseapp.com',
	databaseURL: 'https://XXXXX.firebaseio.com',
	storageBucket: 'XXXX.appspot.com',
	//persistence: true
  });

```

- Executando
Navegue para *front_end/Challenge/*
```
npm install
./bundle.bat
react-native run-android
```
