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
    if (!tweet) {
      return alert('Tweet cannot be empty');
    }
    try {
      const aadmi = await firestore().collection('users').doc(user.uid).get();
      setName(aadmi._data.name);
      console.log(name);
    } catch (e) {}
    try {
      const check = await firestore().collection('Tweets').add({tweet, name});
      navigation.navigate('ShowTweet');
    } catch (err) {
      console.log(err);
    }
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
        <Text style={{color: 'black'}}>
          {' '}
          Share your thoughts to your friends
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={8}
          onChangeText={text => setTweet(text)}
          style={{
            borderWidth: 1,
            width: 350,
            color: 'black',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 30,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#ADD8E6',
            width: 350,
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 20,
          }}
          onPress={handleTweet}>
          <View style={{flexDirection: 'row'}}>
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
