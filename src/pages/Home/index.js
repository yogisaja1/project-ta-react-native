import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Bg} from '../../assets';
import {Card, Gap} from '../../components';
import {getCategoryData, getVideoByRating} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {category, video} = useSelector(state => state.videoReducer);
  const [refreshing, setRefreshing] = useState(false);
  const {width, height} = Dimensions.get('window');
  const imageW = width * 0.7;
  const imageH = imageW * 1.54;

  useEffect(() => {
    dispatch(getCategoryData());
    dispatch(getVideoByRating());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getCategoryData());
    dispatch(getVideoByRating());
    setRefreshing(false);
  };

  const arrPageCategory = [];
  category.map((lcategory, index) => {
    if (index % 3 === 0) {
      arrPageCategory.push(category.slice(index, index + 3));
    }
  });

  const arrPageVideo = [];
  video.map((lvideo, index) => {
    if (index % 3 === 0) {
      arrPageVideo.push(video.slice(index, index + 3));
    }
  });

  return (
    <ImageBackground source={Bg} style={styles.bgContainer} resizeMode="cover">
      <View style={styles.bgVContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <Gap height={12} />
            <View>
              <Text style={styles.title}>Kategori</Text>
              {/* 
              scroll horizontal
               */}
              <View style={{flex: 1}}>
                <Animated.FlatList
                  data={arrPageCategory}
                  horizontal
                  pagingEnabled
                  bounces={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          width,
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        {item.map((lcategory, index) => {
                          return (
                            <Card
                              key={index}
                              name={lcategory.category_name}
                              image={{uri: lcategory.path_image}}
                              onPress={() =>
                                navigation.navigate('VideoList', lcategory)
                              }
                            />
                          );
                        })}
                      </View>
                    );
                  }}
                />
              </View>
              <StatusBar hidden />
            </View>
            {/* 
            Hot Movie
             */}
            <Gap height={12} />
            <View>
              <Text style={styles.title}>Hot Movie</Text>
              <View style={{flex: 1}}>
                {/* 
                Flatlist Video Berdasarkan Rating terbanyak
                 */}
                <Animated.FlatList
                  data={arrPageVideo}
                  horizontal
                  pagingEnabled
                  bounces={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          width,
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        {item.map((lvideo, index) => {
                          return (
                            <Card
                              key={index}
                              name={lvideo.title}
                              rating={lvideo.rating}
                              category={lvideo.category_name}
                              image={{uri: lvideo.path_thumbnail}}
                              onPress={() =>
                                navigation.navigate('Videoo', lvideo)
                              }
                            />
                          );
                        })}
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
          {/* 
          Blockbuster Movie
           */}
          <Gap height={12} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bgVContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  container: {
    flex: 1,
  },
  cardScroll: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: 'white',
    marginHorizontal: 24,
    marginVertical: 12,
  },
});
