import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {firebase} from '../src/firebase-config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import messaging from '@react-native-firebase/messaging';
import {LoginManager} from 'react-native-fbsdk-next';

const Login = props => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorreason, setErrorreason] = useState();

  const getTokenMessage =async()=>{
    const token =await messaging().getToken()
    console.log(token);
    await messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }
 useEffect(()=>{
    getTokenMessage()
  },[])
  
  const userRegister = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(usercredential => {
        const user = usercredential.user;
        console.log('signed in', user.uid);
        setEmail('');
        setPassword('');
        navigation.navigate('Main', {
          screen: 'HomeScreen',
          params: {uid: user.uid},
        });
      })
      .catch(res => {
        console.log(res);
      });
  };

  const LoginUser = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(usercredential => {
        const user = usercredential.user;
        console.log('signed in', user.uid);
        setEmail('');
        setPassword('');
        navigation.navigate('Main', {
          screen: 'HomeScreen',
          params: {uid: user.uid},
        });
      })
      .catch(res => {
        setErrorreason(res);
      });
  };
  //google signin
  GoogleSignin.configure({
    webClientId:
      '318605960287-cvkje8guith3vef6hej8dfr66b94akas.apps.googleusercontent.com',
  });

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential =
        firebase.auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user_sign_in = await firebase
        .auth()
        .signInWithCredential(googleCredential)
        .then(usercredential => {
          const user = usercredential.user;
          console.log('signed in', user.uid);
          setEmail('');
          setPassword('');
          navigation.navigate('Main', {
            screen: 'HomeScreen',
            params: {uid: user.uid},
          });
        });

      // })
    } catch (error) {
      console.log(error);
    }
  };

  //facebook signup
  const onFacebookButtonPress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      const user_sign_in = await firebase
        .auth()
        .signInWithCredential(facebookCredential)
        .then(usercredential => {
          const user = usercredential.user;
          console.log('signed in', user.uid);
          setEmail('');
          setPassword('');
          navigation.navigate('Main', {
            screen: 'HomeScreen',
            params: {uid: user.uid},
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  //mobile auth
 const mobileAuthentication = () =>{
  navigation.navigate('Main', {
    screen: 'Mobileauthentication'
  });
 }

  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput
          splaceholderTextColor="white"
          multiline={true}
          numberOfLines={1}
          selectionColor="white"
          activeOutlineColor="blue"
          mode="outlined"
          label="Name"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          splaceholderTextColor="white"
          multiline={true}
          numberOfLines={1}
          selectionColor="white"
          activeOutlineColor="blue"
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        {errorreason?.message != '' && (
          <Text style={styles.error}>{errorreason?.message}</Text>
        )}
      </View>
      <Text></Text>

      <View style={styles.buttoncontainer}>
        <Button style={styles.button} mode="contained" onPress={LoginUser}>
          Login
        </Button>
        <TouchableOpacity
          onPress={userRegister}
          style={[styles.button, styles.buttonoutline]}>
          <Text style={styles.buttonOutlineText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onGoogleButtonPress}
          style={[styles.button, styles.buttonoutline]}>
          <Text style={styles.buttonOutlineText}>Google Sign-In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onFacebookButtonPress}
          style={[styles.button, styles.buttonoutline]}>
          <Text style={styles.buttonOutlineText}>Facebook Sign-In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputcontainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttoncontainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '100%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonoutline: {
    backgroundColor: 'white',
    marginTop: 8,
    borderColor: '#0782f9',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontSize: 16,
    paddingVertical: 10,
  },
  error: {
    color: 'red',
  },
});
