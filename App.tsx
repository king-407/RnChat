import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Chat from './AfterLogin/Chat';
import auth from '@react-native-firebase/auth';
import Home from './AfterLogin/Home';
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState<any | null>(null);
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
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
