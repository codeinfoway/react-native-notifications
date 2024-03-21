import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import Notification from './src/screen/notification';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screen/home';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    createChannel();
  }, []);

  const channelId = 'USE YOUR CHANNEL ID';

  const requestUserPermission = async () => {
    const systemVersion = parseFloat(DeviceInfo.getSystemVersion());

    if (
      !isNaN(systemVersion) &&
      systemVersion >= 13 &&
      Platform.OS === 'android'
    ) {
      const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
      const status = await check(permission);
      if (status === RESULTS.GRANTED) {
        configNotification();
      } else if (status === RESULTS.DENIED) {
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
          configNotification();
        } else {
          console.log('Permission denied');
        }
      }
    } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        configNotification();
      }
    }
  };

  const createChannel = () => {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: channelId,
          channelName: 'My channel',
          channelDescription: 'A channel to categorise your notifications',
          importance: Importance.HIGH,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    }
  };

  const configNotification = () => {
    PushNotification.configure({
      onRegister: function (token) {},
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
