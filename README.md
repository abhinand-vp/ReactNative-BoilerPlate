
## React Native Boiler Plate with firebase 9
This is a boilerplate for a React Native project with Firebase 9 integration. It includes user signup using email and password, Google signup, Facebook signup, user login with username and password, and the ability to add user details with a profile image.



### Features

- User SignUp using Email and Password
- Google Signup & Facebook signup 
- Splash screen with App icon
- User Login with Username and Password
- Add user details with profile image


### Installation

Required Node version - 18.13.0

Install the dependencies start the server

```
git clone https://github.com/abhinand-vp/ReactNative-BoilerPlate
```
```
cd react-native-boilerplate
```
Install NPM packages
```
npm install
```
```
npm start
```
For Build and run the app

android
```
npx react-native run-android
```    

## Firebase Setup

1. Create a Firebase project:

- Go to https://console.firebase.google.com
- Create a new account on Firebase 
- Create a new project in Firebase console



2. Add an Android app to the Firebase project

- Click on the Android icon 
- Add the package name given by AndroidManifest.xml like (`com.reactnativecrudfirebase`)
- Here, the package name is `com.reactnativecrudfirebase` since this project was cloned. So, add your preferred package name using find and replace.
- Download the **google-service.json** file and replace it on `android/app`


3. Configure Firebase in your React Native app

- Add your Firebase configuration into `config/firebaseHooks.js`



### Configure a firebase in your React Native App
 
- Add your firebase configuration into `config/firebaseHooks.js`

```
apiKey: 'YOUR_KEY_HERE'

authDomain: 'your-auth-domain'

databaseURL: 'https://your-database-name.firebaseio.com'

projectId: 'your-project-id'

storageBucket: 'your-project-id-1234.appspot.com'

messagingSenderId: '12345'

appId: 'insert yours'

  ```
  
- You can get all this information from `Firebase Console -> Project Settings`


### Signup with Username and password

- Enable Email & Password auth method in `Firebase Console -> Authentication -> Sign-in method`

### Google Signup 

- Enable Google auth method in Firebase `Console -> Authentication -> Sign-in method`
- Add supporting email
- You will also need the Debug signing certificate SHA-1. You can get that by running the following command in the project directory.
```
cd android
```
```
./gradlew signingReport
```

- Copy the SHA1 value and paste it into the `Firebase console > project settings >your App`
- Download the **google-services.json file**. You should place this file in the `android/app directory`
- Replace your webclientId (`config/webClient`) with `client/oauth_client/client_id`  in  **google-service-json** file ( Make sure to pick the client_id with client_type: 3 )


### Facebook signup

- Enable Facebook auth method in `Firebase Console -> Authentication -> Sign-in method`
- Add Project **App Id** and **App secret**
- Head to **developers.facebook.com** and create a developer account.
- Go to the Apps section and create a new app
- Once you have created  an application, you will be greeted with the App Dashboard. Add the Facebook Login product to your app from the dashboard.
- `Go to Settings > basic` for getting App Id and App secret


- OAuth redirect URI to your Facebook app configuration from Facebook `Login/ Settings`  
- You can get this from `Firebase Console -> Authentication -> Sign-in method` in Facebook 
 ![Alt text](screenshots/othredirection.png).



### Firebase Database for Adding User Details

Add a Firebase database for adding user details. Create a collection named **users**.

### Firebase Splash Screen

- Make a splash screen image with **3000x3000** dimension.
- Go to https://www.appicon.co/#image-sets and upload the splash screen image to generate the necessary files.
- Copy all the files and place it in `android/app/src/main/res`
- If you want to change the splash screen color, edit colors.xml in `android/spp/src/man/res/values`.
- Rename all the Images files inside the folder to `launch_screen`

### App icons

- Make an app icon image with **1024x1024** dimension.
- Go to https://easyappicon.com and upload the app icon image to generate the necessary files.
- Copy all the files and place them in `android/app/src/main/res`.

### Push Notification

- Go to Messaging on `https://console.firebase.google.com`
- Create your first campaign
- Go to the FCM dashboard to send messages. In the `Engage > Cloud Messaging section` , click on compose notification.
- Enter the notification details
- You can get the token from FCM Token generation function in `screens/Login.js`
- Enable the notification permission in the app settings.

