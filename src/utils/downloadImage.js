import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Alert} from 'react-native';

const downloadImg = async url => {
  const {fs} = RNFetchBlob;
  const filePath = `${fs.dirs.PictureDir}/downloaded_image_${Date.now()}.png`; // Save to Pictures folder
  console.log(filePath);

  try {
    const res = await RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
      path: filePath, // Save the file in the device storage
    }).fetch('GET', url);

    // Save to gallery
    await CameraRoll.saveAsset(res.path(), {type: 'photo'});

    Alert.alert('Success', 'Image downloaded and saved to gallery!');
    console.log('The file is saved to', res.path());
  } catch (error) {
    console.error('Error saving image:', error);
    Alert.alert('Error', 'Failed to save image.');
  }
};

export default downloadImg;
