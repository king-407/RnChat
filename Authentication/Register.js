import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import React from 'react';

const Register = ({navigation}) => {
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
            />
            <Input
              placeholder="Enter your password"
              containerStyle={{width: 350, alignSelf: 'center'}}
              leftIcon={{type: 'material', name: 'lock'}}
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
          onPress={() => navigation.navigate('Chat')}>
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
