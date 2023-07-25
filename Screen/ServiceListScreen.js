
// Import React and Component
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  ScrollView
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


const ServiceListScreen = ({ navigation }) => {

  const concerts = [
    {
      name: 'The Grimme Concert',
      avatar: require('../res/imgs/artist.png'),
      des: 'Our Concert For A Cause host is none other than the amazing Hunter March!'
    },

    {
      name: 'London Rooftop',
      avatar: require('../res/imgs/artist.png'),
      des: ' Live concert series for major artists'
    },

    {
      name: 'The Grimme Concert',
      avatar: require('../res/imgs/artist.png'),
      des: 'Our Concert For A Cause host is none other than the amazing Hunter March!'
    },

    {
      name: 'London Rooftop',
      avatar: require('../res/imgs/artist.png'),
      des: ' Live concert series for major artists'
    },

    {
      name: 'The Grimme Concert',
      avatar: require('../res/imgs/artist.png'),
      des: 'Our Concert For A Cause host is none other than the amazing Hunter March!'
    },

    {
      name: 'London Rooftop',
      avatar: require('../res/imgs/artist.png'),
      des: ' Live concert series for major artists'
    },
  ];

  const goToConcert = () => {
    navigation.navigate('ConcertSelectScreen')
  }

  const goToShopCollection = () => {
    navigation.navigate('ShopCollection')
  }

  const goToService = () => {
    navigation.navigate('ServiceItem')
  }

  const goToShopByBand = () => {
    navigation.navigate('BandList')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./../res/imgs/background.png")} style={styles.backImage}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Instant Karma®</Text>
        </View>
        <TouchableOpacity style={styles.serviceBtnContainer} onPress={goToShopByBand}> 
          <Image source={require("./../res/imgs/music.png")}/>
          <Text style={styles.serviceBtnText}>Shop by Band</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceBtnContainer} onPress={goToConcert}> 
          <Image source={require("./../res/imgs/music.png")}/>
          <Text style={styles.serviceBtnText}>Shop Concerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceBtnContainer} onPress={goToShopCollection}>
          <Image source={require("./../res/imgs/music.png")}/>
          <Text style={styles.serviceBtnText}>Shop Merch</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default ServiceListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%', backgroundColor:'#eeeeee'
  },

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#745EFF',
    height: 80,
    marginBottom: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  serviceBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#745EFF',
    marginTop: 32,
    padding: 8,
    marginLeft: 32, 
    marginRight: 32,
    borderRadius: 4
  },
  serviceBtnText: {
    color: 'white',
    fontSize: 26,
    marginLeft: 16
  }
  
});