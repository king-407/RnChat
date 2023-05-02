import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Lottie from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/EvilIcons';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Tweet = ({user, navigation}) => {
  const [tweet, setTweet] = useState('');
  const [name, setName] = useState('');
  const [photu, setPhotu] = useState('');
  const [avatar, setAvatar] = useState();
  const getUser = async () => {
    const work = await firestore().collection('users').doc(user.uid).get();
    setAvatar(work._data.display);
    setName(work._data.name);
  };
  useEffect(() => {
    getUser();
  }, []);

  const imageHandler = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      data => setPhotu(data.assets[0].uri),
    );
  };
  const handleTweet = async () => {
    if (tweet == '') {
      return alert('Tweet cannot be empty');
    }
    let downloadurl = null;
    if (photu) {
      const splitPath = photu.split('/');
      const imageName = splitPath[splitPath.length - 1];
      const reference = storage().ref(`${user.uid}/images/${imageName}`);
      const data = await reference.putFile(photu);
      downloadurl = await storage()
        .ref(data.metadata.fullPath)
        .getDownloadURL();
    }
    try {
      const upload = await firestore()
        .collection('Tweets')
        .add({tweet, name, photu: downloadurl, avatar});
    } catch (e) {
      console.log(e);
    }
    navigation.navigate('Home');
  };
  return (
    <ScrollView style={{backgroundColor: 'black'}}>
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
            color: 'white',
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
            color: 'white',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 30,
            borderColor: 'white',
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 350,
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 20,
          }}
          onPress={imageHandler}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                padding: 15,
                alignSelf: 'center',
                color: 'black',
                fontWeight: '800',
              }}>
              Add Image
            </Text>
            <AntDesign
              name="sc-telegram"
              color="black"
              size={30}
              style={{padding: 10, alignSelf: 'center'}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
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
                color: 'black',
                fontWeight: '800',
              }}>
              Post
            </Text>
            <AntDesign
              name="sc-telegram"
              color="black"
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
