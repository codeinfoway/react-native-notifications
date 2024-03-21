import React, {useState} from 'react';
import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LabelInput from '../component/labelInput';
import Container from '../component/container';
import PushNotification from 'react-native-push-notification';
import Button from '../component/button';
import {COLORS} from '../utils/colors';
import Header from '../component/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Label from '../component/label';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [imageUri, setImageUri] = useState({
    uri: null,
    name: null,
    fileName: null,
    type: null,
  });
  const channelId = 'USE YOU CHANNEL ID';

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const pushLocalNotifcation = () => {
    let notificationOptions = {
      channelId: channelId,
      title: title,
      message: message,
      color: COLORS.secondary,
      smallIcon: 'ic_notifications',
      largeIcon: '',
      userInfo: {
        date: new Date(),
      }
    };
    if (imageUri?.uri !== null) {
      notificationOptions.bigPictureUrl = imageUri?.uri;
    }
    PushNotification.localNotification(notificationOptions);
    storeNotification(notificationOptions);
  };

  const storeNotification = async notification => {
    try {
      const existingNotifications = await AsyncStorage.getItem('notifications');
      const notifications = existingNotifications
        ? JSON.parse(existingNotifications)
        : [];
      notifications.push(notification);
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(notifications),
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error storing notification:', error);
    }
  };

  const getMediaFromGallery = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: DocumentPicker.types.images,
      });
      setImageUri({
        uri: result[0]?.uri,
        name: result[0]?.name,
        fileName: result[0]?.name,
        type: result[0]?.type,
      });
    } catch (err) {
      console.log('error from image ==', err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title={'Generate Notification'}
        leftIcon={'chevron-left'}
        leftPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Container mpContainer={{mh: 20, mv: 20}}>
          <LabelInput
            label="Title"
            value={title}
            onChangeText={text => {
              setTitle(text);
              if (text?.trim()?.length !== 0) {
                setTitleError(false);
              } else {
                setTitleError(true);
              }
            }}
            mpContainer={{mv: 15}}
            onBlur={() => {
              if (title?.trim()?.length === 0) {
                setTitleError(true);
              } else {
                setTitleError(false);
              }
            }}
            touched={titleError ? true : false}
            errors="Title is required"
          />
          <LabelInput
            label="Message"
            value={message}
            onChangeText={text => {
              setMessage(text);
              if (text?.trim()?.length !== 0) {
                setMessageError(false);
              } else {
                setMessageError(true);
              }
            }}
            mpContainer={{mv: 15}}
            onBlur={() => {
              if (message?.trim()?.length === 0) {
                setMessageError(true);
              } else {
                setMessageError(false);
              }
            }}
            touched={messageError ? true : false}
            errors="Message is required"
          />

          <Label
            size={16}
            fontFamily={'poppins-semiBold'}
            color={COLORS.secondary}
            mpLabel={{mt: 15}}>
            Big Picture
          </Label>
          <TouchableOpacity
            style={{
              height: 150,
              marginBottom: 20,
              borderRadius: 10,
              marginVertical: '2%',
              borderStyle: 'dashed',
              borderColor: COLORS.gray4,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }} 
            activeOpacity={0.7}
            onPress={getMediaFromGallery}>
            {imageUri?.uri ? (
              <Image
                source={{uri: imageUri.uri}}
                style={{
                  height: '102%',
                  width: '101%',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.gray4,
                }}
                resizeMode="cover"
              />
            ) : (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  size={20}
                  color={COLORS.placeHolder}
                />
              </>
            )}
          </TouchableOpacity>

          <Button
            title="Generate Notification"
            onPress={pushLocalNotifcation}
            mpBtn={{mt: 50}}
            disabled={
              title.trim().length == 0 && message.trim().length == 0
                ? true
                : false
            }
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
