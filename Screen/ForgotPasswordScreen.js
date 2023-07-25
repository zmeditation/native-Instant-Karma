
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
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {

  const sendVerifyEmail = () => {

  }


  const [userEmail, setUserEmail] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
        <KeyboardAvoidingView enabled>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserEmail) =>
              setUserEmail(UserEmail)
            }
            placeholder="Email" //dummy@abc.com
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={styles.normalButton}
            onPress={sendVerifyEmail}
          >
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%'
  },

  normalButton: {
    borderRadius: 6,
    tintColor: '#745EFF',
    backgroundColor: '#745EFF',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    padding: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },
  inputStyle: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dadae8',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    padding: 8,
    fontSize: 16,

  },
});