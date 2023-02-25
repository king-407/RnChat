import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import React, {useState} from 'react';
import {auth} from '@react-native-firebase/auth';
import Lottie from 'lottie-react-native';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    if (!email || !password) {
      alert('please add all the field');
      return;
    }
    try {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => response.json())
        .catch(err => console.log(err));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return <Lottie source={require('../animations/loader.json')} autoPlay />;
  }
  return (
    <>
      <StatusBar animated={true} backgroundColor="white" />
      <View
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
        }}>
        <Image
          style={{
            height: 280,
            width: 250,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}
          source={require('../images/Login.png')}
        />
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#000',
              fontSize: 50,
              marginLeft: 40,
              fontWeight: '500',
            }}>
            Login
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
          onPress={onLogin}>
          <Text
            style={{
              padding: 15,
              alignSelf: 'center',
              color: 'white',
              fontWeight: '800',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: 15,
            marginTop: 5,
          }}>
          Don't have an account ?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'blue'}}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </>
  );
};

export default Login;
