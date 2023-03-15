import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {IcStarOn} from '../../../assets';

const Card = ({image, name, onPress, rating}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.contain}>
          <TextTicker
            style={styles.text}
            duration={5000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={2000}>
            {name}
          </TextTicker>
          {rating && (
            <View style={styles.ratingContainer}>
              <IcStarOn />
              <Text style={styles.rating}>{rating}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: '#000000',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  contain: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    width: 200,
    height: 250,
    resizeMode: 'cover',
    position: 'relative',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  rating: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-light',
    marginBottom: 5,
    paddingStart: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
});
