# challenge_taylor


#Firebase

firebase deploy

ou

firebase deploy -- only functions

#Front
Build
```
exp build:android
```


(in project directory) mkdir android/app/src/main/assets
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
react-native run-android