import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVideoById} from '../../redux/action';
import {Card, Gap} from '../../components';
import {Bg} from '../../assets';

const VideoList = ({navigation, route}) => {
  const {id_kategory_video} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoById(id_kategory_video));
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getVideoById(id_kategory_video));
    setRefreshing(false);
  };
  const {videoById} = useSelector(state => state.videoReducer);
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
              <Text style={styles.title}>Video</Text>

              <View style={styles.cardWrap}>
                {videoById.map((lvideo, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: '25.00%',
                      }}>
                      <Card
                        key={lvideo.id_video}
                        name={lvideo.title}
                        rating={lvideo.rating}
                        image={{uri: lvideo.path_thumbnail}}
                        onPress={() => navigation.navigate('Videoo', lvideo)}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: 'white',
  },
  bgVContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  bgContainer: {
    flex: 1,
  },
  cardWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginVertical: 12,
  },
});
