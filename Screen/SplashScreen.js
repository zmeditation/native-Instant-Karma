
// Import React and Component
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text
} from 'react-native';

const SplashScreen = ({ navigation }) => {

    const [animating, setAnimating] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
          navigation.replace('Main')

      }, 2000);
    }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../res/imgs/splash_back.png')} style={styles.backImage}>
        
        <ActivityIndicator
        animating={animating}
        color="#292B2D"
        size="large"
        style={styles.activityIndicator}
      />
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%'
  },

  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});