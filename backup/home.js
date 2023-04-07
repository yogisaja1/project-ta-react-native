import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Bg} from '../../assets';
import {Card, Gap} from '../../components';
import {getCategoryData} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {category} = useSelector(state => state.videoReducer);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getCategoryData());
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getCategoryData());
    setRefreshing(false);
  };

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
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.cardScroll}>
                  {category.map(lcategory => {
                    return (
                      <Card
                        key={lcategory.id_kategory_video}
                        name={lcategory.category_name}
                        image={{
                          uri: lcategory.path_image,
                        }}
                        onPress={() =>
                          navigation.navigate('VideoList', lcategory)
                        }
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
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
    marginHorizontal: 24,
    marginVertical: 12,
  },
  cardScroll: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: 'white',
  },
});
