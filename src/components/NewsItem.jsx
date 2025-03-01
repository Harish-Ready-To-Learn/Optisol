import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import downloadImg from '../utils/downloadImage';
import RNFetchBlob from 'rn-fetch-blob';

const NewsItem = ({item, index}) => {
  const [localImagePath, setLocalImagePath] = useState(null);

  const {fs} = RNFetchBlob;
  const imagePath = `${fs.dirs.PictureDir}/${item.source.name}_${index}.png`;
  useEffect(() => {
    checkAndDownloadImage();
  }, []);
  const checkAndDownloadImage = async () => {
    const fileExists = await fs.exists(imagePath);
    if (fileExists) {
      console.log(`file://${imagePath}`);
      setLocalImagePath(`file://${imagePath}`);
    } else {
      //   downloadImage();
    }
  };
  return (
    <View style={styles.container}>
      {item.urlToImage ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: localImagePath ? localImagePath : item.urlToImage}}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={async () => {
              if (localImagePath) {
                Alert.alert(
                  'Download',
                  `Image already downloaded and saved to gallery! in the path ${localImagePath}`,
                );
              } else {
                let imagePath = `${fs.dirs.PictureDir}/${item.source.name}_${index}.png`;
                let imageDownloaded = await downloadImg(
                  item.urlToImage,
                  item.source.name,
                  index,
                );
                if (imageDownloaded) setLocalImagePath(`file://${imagePath}`);
              }
            }}>
            <Image
              source={require('../assets/download_icon.png')}
              style={styles.downloadIcon}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[
            styles.imageContainer,
            {
              alignItems: 'center',
              justifyContent: 'center',
              width: Dimensions.get('screen'),
            },
          ]}>
          <Image
            source={require('../assets/no-pictures.png')}
            style={styles.noImgIcon}
          />
        </View>
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  downloadButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 20,
  },
  downloadIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  noImgText: {
    fontSize: 24,
    fontWeight: '900',
  },
  noImgIcon: {
    height: 200,
    width: 200,
  },
});
