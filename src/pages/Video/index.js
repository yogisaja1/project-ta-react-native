const {default: Axios} = require('axios');
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import Video from 'react-native-video-controls';
import {useSelector, useDispatch} from 'react-redux';
import {Bg} from '../../assets';
import {Card} from '../../components';
import {API_HOST} from '../../config';
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

  const handleEnd = (video, rating, kategory_id) => {
    // ubah rating menjadi integer
    const ratingInt = parseInt(rating);
    dispatch(setRating(video, ratingInt + 1));
    dispatch(getVideoById(kategory_id));
  };

  const handleFullScreen = () => {
    setFullscreen(!fullscreen);
  };

  // mengambil data video berdasarkan kategory_id
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
            height: height / 1.5,
            backgroundColor: 'white',
            width: '100%',
          }}>
          <Video
            key={video.id_video}
            resizeMode="contain"
            videoHeight="100%"
            fullscreenOrientation="landscape"
            onEnterFullscreen={handleFullScreen}
            onExitFullscreen={handleFullScreen}
            onEnd={() => handleEnd(video.id_video, video.rating, kategory_id)}
            onBack={() => navigation.goBack()}
            source={{
              uri: video.path_video,
            }}
            style={fullscreen ? styles.fullscreenVideo : styles.normalVideo}
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.cardWrap}>
                {videoById.map(lvideo => {
                  return (
                    <Card
                      key={lvideo.id_video}
                      name={lvideo.title}
                      rating={lvideo.rating}
                      image={{uri: lvideo.path_thumbnail}}
                      onPress={() => video_data(lvideo)}
                    />
                  );
                })}
              </View>
            </ScrollView>
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
  fullscreenVideo: {
    height: '100%',
    width: '100%',
  },
  normalVideo: {
    height: 300,
  },
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
  cardWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
