import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import downloadImg from '../utils/downloadImage';
const NewsItem = ({item}) => {
  return (
    <View style={styles.container}>
      {item.urlToImage ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: item.urlToImage}}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => {
              downloadImg(item.urlToImage);
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
