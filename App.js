import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Chat from './AfterLogin/Chat';
import auth from '@react-native-firebase/auth';
import Home from './AfterLogin/Home';
import Tweet from './AfterLogin/Tweet';
import ShowTweet from './AfterLogin/ShowTweet';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unregister = auth().onAuthStateChanged(exist => {
      if (exist) setUser(exist);
      else setUser(null);
    });

    return () => {
      unregister();
    };
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {props => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="Chat"
              options={({route}) => ({title: route.params.email})}>
              {props => <Chat {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Tweet">
              {props => <Tweet {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="ShowTweet">
              {props => <ShowTweet {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
