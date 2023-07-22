import {firebase} from "../src/firebase-config";
import uuid from 'react-native-uuid';



export const updateFile = async (uri='',path='profile-image')  => {
    console.log("uuid",uuid.v4());
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const fileRef = firebase.storage().ref().child('/'+path+'/'+uuid.v4())

      const snapshot  =  await fileRef.put(blob);
      const remoteUri = await snapshot.ref.getDownloadURL();
    
      // when we're done sending it, close and release the blob
      blob.close();
    
      // return the result, eg. remote URI to the image
      return remoteUri;
    }