
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

const SignUpScreen = ({ navigation }) => {


  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');


  const emailInputRef = createRef();
  const phoneInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPwdInputRef = createRef();

  const handleRegister = () => {
    
  }



  return (
    <View style={styles.container}>

      <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
        <KeyboardAvoidingView enabled>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserName) => setUserName(UserName)}
            underlineColorAndroid="#f000"
            placeholder="Account Name*"
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() =>
              emailInputRef.current && emailInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
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
            onSubmitEditing={() =>
              phoneInputRef.current &&
              phoneInputRef.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPhone) =>
              setUserPhone(UserPhone)
            }
            placeholder="Phone Number"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="number"
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
             
            onSubmitEditing={() =>
              confirmPwdInputRef.current &&
              confirmPwdInputRef.current.focus()
            }
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />

          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserConfirmPassword) =>
              setUserConfirmPassword(UserConfirmPassword)
            }
            placeholder="Confirm Password" //12345
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            ref={confirmPwdInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />

          <TouchableOpacity
            style={styles.normalButton}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>


        </KeyboardAvoidingView>
      </ImageBackground>

    </View>
  );
};

export default SignUpScreen;

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