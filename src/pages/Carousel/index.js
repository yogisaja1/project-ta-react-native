import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

const data = [
  'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg',
  'https://www.gannett-cdn.com/presto/2021/03/22/NRCD/9d9dd9e4-e84a-402e-ba8f-daa659e6e6c5-PhotoWord_003.JPG',
  'https://st2.depositphotos.com/1000423/11347/i/600/depositphotos_113479098-stock-photo-under-pressure-of-difficulties.jpg',
  'https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
  'https://png.pngtree.com/background/20210715/original/pngtree-double-row-tree-path-with-yellow-deciduous-autumn-leaves-picture-image_1293368.jpg',
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const Carousel = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <StatusBar hidden />
      {/* 
      absoluteFillObject digunakan untuk mengisi layar
       */}
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${i}`}
              source={{uri: image}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              blurRadius={50}
            />
          );
        })}
      </View>
      {/* 
      Animated Digunakan untuk membuat animasi
       */}
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.5,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 20,
              }}>
              <Image
                source={{uri: item}}
                style={{width: imageW, height: imageH, resizeMode: 'cover'}}
                borderRadius={16}
              />
            </View>
          );
        }}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
