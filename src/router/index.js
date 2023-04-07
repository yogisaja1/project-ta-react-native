import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  Carousel,
  Home,
  SplashScreen,
  VideoList,
  Videoo,
  Videos,
} from '../pages';

const Stack = createStackNavigator();

const optionHeader = {headerShown: false};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={optionHeader}
      />
      <Stack.Screen name="Home" component={Home} options={optionHeader} />
      <Stack.Screen
        name="VideoList"
        component={VideoList}
        options={optionHeader}
      />
      <Stack.Screen name="Video" component={Videos} options={optionHeader} />
      <Stack.Screen name="Videoo" component={Videoo} options={optionHeader} />
      <Stack.Screen
        name="Carousel"
        component={Carousel}
        options={optionHeader}
      />
    </Stack.Navigator>
  );
};

export default Router;
