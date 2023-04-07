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

const Videoo = ({navigation, route}) => {
  const {title, duration, path_video, kategory_id, id_video, rating} =
    route.params;
  const {width, height} = Dimensions.get('window');
  const {videoById} = useSelector(state => state.videoReducer);
  const dispatch = useDispatch();
  const [pause, setPause] = useState(false);
  const [time, setTime] = useState(0);

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
    }
  });

  // handle end video maka lanjut ke video selanjutnya
  const handleEnd = lvideo => {
    //dapatkan data array selanjutnya
    const nextVideo = videoById.find(
      lvideo => lvideo.id_video === video.id_video + 1,
    );
    // jika data array selanjutnya tidak ada maka kembali ke data array pertama
    if (nextVideo === undefined) {
      const firstVideo = videoById.find(lvideo => lvideo.id_video === 1);
    }
    // jika data array selanjutnya ada maka lanjut ke data array selanjutnya
    else {
      setVideo({
        id_video: nextVideo.id_video,
        title: nextVideo.title,
        duration: nextVideo.duration,
        path_video: nextVideo.path_video,
        kategory_id: nextVideo.kategory_id,
        rating: nextVideo.rating,
      });
    }
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
            onEnd={() => handleEnd(video)}
            onBack={() => navigation.goBack()}
            onProgress={
              pause
                ? null
                : ({currentTime}) => {
                    setTimeout(() => {
                      setTime(1 + time);
                      if (time === 300) {
                        dispatch(setRating(video.id_video, video.rating + 1));
                      }
                    }, 1000);
                  }
            }
            // dapatkan data full waktu video
            onLoad={data => {
              console.log(data);
            }}
            onPaused={() => setPause(true)}
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
            <View style={{flex: 1, marginStart: 30}}>
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
                        justifyContent: 'space-evenly',
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

export default Videoo;

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
  backgroundVideo: {
    flex: 1,
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
