
// Import React and Component
import React, { useState, useEffect, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';

const SignInScreen = ({ navigation }) => {

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen')
  }

  const goToRegister = () => {
    navigation.navigate('SignUpScreen')
  }

  const handleLogin = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please input your email');
      return;
    }
    if (!userPassword) {
      alert('Please input your password');
      return;
    }
    navigation.replace('Main');
  }

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const passwordInputRef = createRef();

  

  return (
    <View style={styles.container}>

      <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
        <KeyboardAvoidingView enabled>
          
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserEmail) =>
              setUserEmail(UserEmail)
            }
            placeholder="Email/User Name" //dummy@abc.com
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current &&
              passwordInputRef.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPassword) =>
              setUserPassword(UserPassword)
            }
            placeholder="Password" //12345
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
          <TouchableOpacity onPress={goToForgotPassword}>
            <Text style={{textAlign: 'right', marginRight: 24, marginTop: 8, marginBottom: 20}}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.normalButton}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.normalButton}
            onPress={goToRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          
        </KeyboardAvoidingView>
      </ImageBackground>

    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    width: '100%', height: '100%'
  },

  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#292B2D',
    marginTop: 20,
    marginBottom: 20,
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