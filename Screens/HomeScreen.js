import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {firebase} from '../src/firebase-config';
import {TextInput, Button} from 'react-native-paper';
import UploadScreen from './Uploadsceen';
import {updateProfileimage} from '../Services/UploadprofileImage';

const HomeScreen = props => {
  const {navigation, route} = props;
  const userId = route.params?.uid;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [fileResponse, setFileResponse] = useState([]);
  const [profileurl, setProfileurl] = useState('');
  const [userprofileurl, setUserprofileurl] = useState('');
  const [userExist, setUserExist] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const usersData = firebase
      .firestore()
      .collection('users')
      .where('uid', '==', userId)
      .get()
      .then(snapShot => {
        setIsLoaded(true);
        if (!snapShot.empty) {
          setUserExist(true);
          navigation.navigate('Main', {
            screen: 'Dashboard',
            params: {uid: userId},
          });
        }
      });
  }, []);

  const updateuser = async () => {
    try {
      let updatedFile;
      if (userprofileurl != '') {
        updatedFile = await updateProfileimage(
          userprofileurl,
          'user-profile-image',
        );
      }
      const user = {
        name,
        email,
        mobile,
        profileurl: userprofileurl != '' ? updatedFile : '',
        uid: userId,
      };
      const newuser = await firebase.firestore().collection('users').add(user);
      console.log('err', newuser);
      navigation.navigate('Main', {
        screen: 'Dashboard',
        params: {uid: userId},
      });
      props.navigation.navigate('Dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoaded && userExist == false ? (
        <KeyboardAvoidingView style={styles.container}>
          <UploadScreen setUserprofileurl={setUserprofileurl} />
          {fileResponse.map((file, index) => (
            <Text
              key={index.toString()}
              style={styles.uri}
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {file?.uri}
            </Text>
          ))}
          <View style={styles.inputcontainer}>
            <TextInput
              splaceholderTextColor="white"
              multiline={true}
              numberOfLines={1}
              selectionColor="white"
              activeOutlineColor="blue"
              mode="outlined"
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              splaceholderTextColor="white"
              multiline={true}
              numberOfLines={1}
              selectionColor="white"
              activeOutlineColor="blue"
              mode="outlined"
              label="Email"
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
              label="Mobile"
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
          </View>

          <View style={styles.buttoncontainer}>
            <Button style={{width: 100}} mode="contained" onPress={updateuser}>
              <Text>Upload</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      ) : null}
    </>
  );
};

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
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 5,
    borderRadius: 10,
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
});

export default HomeScreen;
