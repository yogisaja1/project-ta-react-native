import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import Video from 'react-native-video-controls';
import {useDispatch, useSelector} from 'react-redux';
import {Bg} from '../../assets';
import {Card} from '../../components';
import {getVideoById, setRating} from '../../redux/action';

const Videos = ({navigation, route}) => {
  const {title, duration, path_video, kategory_id, id_video, rating} =
    route.params;
  const {width, height} = Dimensions.get('window');
  const {videoById} = useSelector(state => state.videoReducer);
  const dispatch = useDispatch();

  const [fullscreen, setFullscreen] = useState(false);

  const [video, setVideo] = useState({
    id_video: id_video,
    title: title,
    duration: duration,
    path_video: path_video,
    kategory_id: kategory_id,
    rating: rating,
  });

  const arrPage = [];
  videoById.map((lcategory, index) => {
    if (index % 3 === 0) {
      arrPage.push(videoById.slice(index, index + 3));
      lcategory.length = 3;
    }
  });

  const handleEnd = (video, rating, kategory_id) => {
    const ratingInt = parseInt(rating);
    dispatch(setRating(video, ratingInt + 1));
    dispatch(getVideoById(kategory_id));
  };

  const handleFullScreen = () => {
    setFullscreen(!fullscreen);
  };

  const video_data = lvideo => {
    setVideo({
      id_video: lvideo.id_video,
      title: lvideo.title,
      duration: lvideo.duration,
      path_video: lvideo.path_video,
      kategory_id: lvideo.kategory_id,
      rating: lvideo.rating,
    });
  };

  useEffect(() => {
    dispatch(getVideoById(kategory_id));
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainPlayerView}>
        <View
          style={{
            height: height,
            backgroundColor: 'white',
            width: width,
          }}>
          <Video
            key={video.id_video}
            resizeMode="contain"
            videoHeight={height}
            fullscreenOrientation="landscape"
            onEnterFullscreen={handleFullScreen}
            onExitFullscreen={handleFullScreen}
            onEnd={() => handleEnd(video.id_video, video.rating, kategory_id)}
            onBack={() => navigation.goBack()}
            source={{
              uri: video.path_video,
            }}
          />
        </View>

        <ImageBackground
          source={Bg}
          style={styles.bgContainer}
          resizeMode="cover">
          <View style={styles.bgVContainer}>
            <View style={styles.containtContainer(width)}>
              <Text style={styles.postTitle}>{video.title}</Text>
              <Text style={styles.postDuration}>{video.duration} m</Text>
              <Text style={styles.postDuration}>{video.rating} Rating</Text>
            </View>
            <View style={{flex: 1, height: height}}>
              <Animated.FlatList
                data={arrPage}
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
                        justifyContent:
                          item.length < 3 ? 'flex-start' : 'space-evenly',
                        marginStart: item.length < 3 ? 20 : 0,
                      }}>
                      {item.map((lvideo, index) => {
                        return (
                          <Card
                            key={index}
                            name={lvideo.title}
                            image={{uri: lvideo.path_thumbnail}}
                            rating={lvideo.rating}
                            onPress={() => video_data(lvideo)}
                          />
                        );
                      })}
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default Videos;

const styles = StyleSheet.create({
  mainPlayerView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  bgContainer: {
    flex: 1,
  },
  containtContainer: width => ({
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }),
  bgVContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FAFAFA',
  },
  postDuration: {
    fontSize: 16,
    color: '#FAFAFA',
    marginTop: 5,
  },
});
