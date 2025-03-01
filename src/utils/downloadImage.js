import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Alert} from 'react-native';

const downloadImg = async (url, source, index) => {
  const {fs} = RNFetchBlob;
  const filePath = `${fs.dirs.PictureDir}/${source}_${index}.png`;

  try {
    console.log(filePath);
    const res = await RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
      path: filePath,
    }).fetch('GET', url);

    await CameraRoll.saveAsset(res.path(), {type: 'photo'});

    Alert.alert(
      'Success',
      `Image downloaded and saved to gallery! in the path ${filePath}`,
    );
    return true;
  } catch (error) {
    console.error('Error saving image:', error);
    Alert.alert('Error', 'Failed to save image.');
  }
};

export default downloadImg;
