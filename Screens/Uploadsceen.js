import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TextInput, Button} from 'react-native-paper';

const UploadScreen = props => {
  const [camaraphoto, setCamaraPhoto] = useState();
  const [active, setactive] = useState(false);

  let options = {
    saveTophotos: true,
    mediaType: 'photo',
  };

  const selectImage = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCamaraPhoto(result.assets[0].uri);
      props.setUserprofileurl(result.assets[0].uri);
      setactive(!active);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setCamaraPhoto(result.assets[0].uri);
    props.setUserprofileurl(result.assets[0].uri);
    setactive(!active);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={active}
        onRequestClose={() => {
          console.warn('closed');
        }}>
        <View style={styles.modalcontainer}>
          <View style={styles.View}>
            <Button
              mode="contained"
              style={{marginVertical: 10}}
              onPress={selectImage}>
              opne Camara
            </Button>
            <Button
              mode="contained"
              style={{marginVertical: 10}}
              onPress={openGallery}>
              opne Gallery
            </Button>

            <Button
              mode="contained"
              style={{marginVertical: 10, backgroundColor: 'red'}}
              onPress={() => {
                setactive(!active);
              }}>
              close
            </Button>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={selectImage}>
        <Image style={styles.profileimage} source={{uri: camaraphoto}} />
      </TouchableOpacity>

      <Button
        mode="contained"
        style={{marginVertical: 10}}
        onPress={() => {
          setactive(!active);
        }}>
        Upload Profile
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  selectButton: {
    borderRadius: 5,
    width: 180,
    height: 50,
    backgroundColor: '#66a3ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#66a3ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
  profileimage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: 'hidden',
  },
  View: {
    backgroundColor: 'white',
    height: 300,
    width: 300,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectcloseButton: {
    borderRadius: 5,
    width: 180,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#66a3ff',
  },
});

export default UploadScreen;
