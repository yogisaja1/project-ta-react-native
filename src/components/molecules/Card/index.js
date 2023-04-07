import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {IcStarOn} from '../../../assets';

const {width, height} = Dimensions.get('window');

const cardWidth = 0.3 * width - 80;

const Card = ({image, name, onPress, rating, category}) => {
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
              <View style={styles.ratingContain}>
                <IcStarOn />
                <Text style={styles.rating}>{rating}</Text>
              </View>
              {/* 
              jika ada props category maka akan menampilkan category
               */}
              {category && (
                <View style={styles.categoryContainer}>
                  <Text style={styles.rating}>|</Text>
                  <View style={styles.category}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: 'Poppins-Light',
                      }}>
                      {category}
                    </Text>
                  </View>
                </View>
              )}
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
    width: cardWidth,
    backgroundColor: '#000000',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
    marginVertical: 15,
  },
  contain: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    width: cardWidth,
    height: 200,
    resizeMode: 'cover',
    position: 'relative',
  },
  text: {
    fontSize: 15,
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
  ratingContain: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginStart: 5,
  },
  category: {
    marginStart: 5,
    paddingHorizontal: 2,
    marginVertical: 2,
  },
});
