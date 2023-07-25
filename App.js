/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';

import {
  SafeAreaView,
  Text,
  View,
  Button,

} from 'react-native';

import Toast from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceListScreen from './Screen/ServiceListScreen';
import ConcertTypeScreen from './Screen/ConcertTypeScreen';
import ConcertPriceScreen from './Screen/ConcertPriceScreen';
import ConcertPurchasedScreen from './Screen/ConcertPurchasedScreen';
import ShopCollectionScreen from './Screen/ShopCollectionScreen';
import ShopItemScreen from './Screen/ShopItemScreen';
import ShopDetailScreen from './Screen/ShopDetailScreen';
import SplashScreen from './Screen/SplashScreen';
import SignInScreen from './Screen/SignInScreen';
import SignUpScreen from './Screen/SignUpScreen';
import ForgotPasswordScreen from './Screen/ForgotPasswordScreen';
import VerifyScreen from './Screen/VerifyScreen';

import ConcertSelectScreen from './Screen/ConcertSelectScreen';
import ShopItemListScreen from './Screen/ShopItemListScreen';
import ConcertCartScreen from './Screen/ConcertCartScreen';
import BandListScreen from './Screen/BandListScreen';
import BandItemListScreen from './Screen/BandItemListScreen';

const Stack = createNativeStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="SignInScreen" >
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{title: 'Sign In'}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{title: 'Sign Up'}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{title: 'Forgot Password?'}}
      />
      <Stack.Screen
        name="VerifyScreen"
        component={VerifyScreen}
        options={{title: 'Verify your account'}}
      />
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="ServiceList" >
        <Stack.Screen name="ServiceList" component={ServiceListScreen} options={{headerShown: false}}/>
        <Stack.Screen name="BandList" component={BandListScreen} options={{headerShown: false}}/>
        <Stack.Screen name="BandItemList" component={BandItemListScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ConcertSelectScreen" component={ConcertSelectScreen} options={{headerShown: false}} />
        <Stack.Screen name="ConcertType" component={ConcertTypeScreen} />
        <Stack.Screen name="ConcertPrice" component={ConcertPriceScreen} options={{headerShown: false}} />
        <Stack.Screen name="ConcertPurchased" component={ConcertPurchasedScreen} options={{headerShown: false}} />
        <Stack.Screen name="ShopCollection" component={ShopCollectionScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ShopItemList" component={ShopItemListScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ShopItem" component={ShopItemScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ShopDetail" component={ShopDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ConcertCart" component={ConcertCartScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};


const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
        
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}s
        />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>


  );
};


export default App;


