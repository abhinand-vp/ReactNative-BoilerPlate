import {StyleSheet, View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {firebase} from '../src/firebase-config';

const Dashboard = props => {
  const {route} = props;
  const userId = route?.params?.uid;
  const [data, setData] = useState([]);
  useEffect(() => {
    const usersData = firebase
      .firestore()
      .collection('users')
      .where('uid', '==', userId)
      .get()
      .then(snapShot => {
        let newArray = [];
        snapShot.forEach(data => {
          newArray.push(data.data());
        });
        setData([...newArray]);
      });
  }, []);

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.navigation.navigate('Login');
      })
      .catch(error => setState({errorMessage: error.message}));
  };

  let timeOfDay;
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    timeOfDay = 'Morning';
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'Afternoon';
  } else {
    timeOfDay = 'Evening';
  }

  return (
    <View style={styles.inputcontainer}>
      <View style={styles.name}>
        {data.map(item => (
          <View style={styles.card} key={item.id}>
            <Text style={styles.headingname}>
              Good {timeOfDay} {item.name}
            </Text>
            <Image style={styles.profileurl} source={{uri: item.profileurl}} />
          </View>
        ))}
      </View>
      <Button
        style={styles.buttonPosition}
        mode="contained"
        onPress={signOutUser}>
        Logout
      </Button>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  inputcontainer: {
    flex: 1,

    // marginBottom: 50,
  },
  buttonPosition: {
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
  },
  headingname: {
    fontSize: 20,
    fontWeight: 'Bold',
    marginLeft: 10,
    color: '#ffffff',
  },
  card: {
    margin: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    height: 350,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
  },
  profileurl: {
    width: 50,
    height: 50,
    // alignSelf : 'flex-end',
    borderRadius: 150 / 2,
  },
  smalltext: {
    marginLeft: 10,
  },
});
