import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Lottie from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/EvilIcons';
import firestore from '@react-native-firebase/firestore';

const Tweet = ({user, navigation}) => {
  const [tweet, setTweet] = useState('');
  const [name, setName] = useState('');

  const handleTweet = async () => {
    if (tweet == '') {
      return alert('Tweet cannot be empty');
    }

    try {
      const aadmi = await firestore().collection('users').doc(user.uid).get();
      setName(aadmi._data.name);
      console.log(name);
    } catch (e) {}

    try {
      firestore().collection('Tweets').add({tweet, name});
    } catch (err) {
      console.log(err);
    }
    navigation.navigate('ShowTweet');
  };
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <Lottie
          style={{alignSelf: 'center', height: 300, width: 10, marginTop: 20}}
          source={require('../animations/tweet.json')}
          autoPlay
        />
      </View>
      <View style={{}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'TiltWarp-Regular',
            color: '#dc143c',
            fontSize: 25,
            marginTop: 20,
            marginLeft: 10,
          }}>
          {' '}
          What's in your mind 🤔🤔 ? ?
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          onChangeText={text => setTweet(text)}
          style={{
            borderWidth: 3,
            width: 350,
            color: '#dc143c',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 30,
            borderColor: '#dc143c',
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#dc143c',
            width: 350,
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 20,
          }}
          onPress={handleTweet}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                padding: 15,
                alignSelf: 'center',
                color: 'white',
                fontWeight: '800',
              }}>
              Post
            </Text>
            <AntDesign
              name="sc-telegram"
              color="white"
              size={30}
              style={{padding: 10, alignSelf: 'center'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Tweet;
