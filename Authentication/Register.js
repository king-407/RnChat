import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import Lottie from 'lottie-react-native';
const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const onRegister = async () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert(
        'Warning',
        'Please enter all fields',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(result);
      firestore()
        .collection('users')
        .doc(result.user.uid)
        .set({email, uid: result.user.uid});
    } catch (error) {
      console.log(error);
      // Alert.alert(
      //   'Something went wrong',
      //   'Try again later',
      //   [
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel',
      //     },
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   ],
      //   {cancelable: false},
      // );
    }
    setLoading(false);
  };
  if (loading) {
    return <Lottie source={require('../animations/loader.json')} autoPlay />;
  }
  return (
    <>
      <StatusBar animated={true} backgroundColor="white" />
      <View style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
        <Image
          style={{
            height: 280,
            width: 250,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}
          source={require('../images/Register.png')}
        />
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#000',
              fontSize: 50,
              marginLeft: 40,
              fontWeight: '500',
            }}>
            Sign Up
          </Text>
          <View style={{marginTop: 20}}>
            <Input
              placeholder="Enter your email"
              containerStyle={{width: 350, alignSelf: 'center'}}
              leftIcon={{type: 'material', name: 'email'}}
              onChangeText={text => setEmail(text)}
            />
            <Input
              placeholder="Enter your password"
              containerStyle={{width: 350, alignSelf: 'center'}}
              leftIcon={{type: 'material', name: 'lock'}}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#ADD8E6',
            width: 350,
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 20,
          }}
          onPress={onRegister}>
          <Text
            style={{
              padding: 15,
              alignSelf: 'center',
              color: 'white',
              fontWeight: '800',
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Register;
