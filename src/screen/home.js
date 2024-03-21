import React, {useCallback, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {COLORS} from '../utils/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Header from '../component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Label from '../component/label';
import Container from '../component/container';
import moment from 'moment';

const Home = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [refresh, setIsRefresh] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const Notifications = async () => {
        const data = await AsyncStorage.getItem('notifications');
        if (data) {
          const notificationArray = JSON.parse(data);
          setIsRefresh(false)
          setNotifications(notificationArray);
        }
      };
      Notifications();
    }, [refresh]),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title={'Notification'} />
      <Animated.FlatList
        data={notifications}
        onRefresh={() => setIsRefresh(true)}
        refreshing={refresh}
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={({item}) => (
          <View
            style={{
              padding: 10,
              marginHorizontal: 15,
              marginVertical: 5,
              backgroundColor: COLORS.white2,
              borderRadius: 10,
            }}>
            <Container
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Label
                size={20}
                color={COLORS.secondary}
                style={{fontWeight: '600'}}>
                {item.title}
              </Label>
              <Label
                size={12}
                color={COLORS.secondary}
                style={{fontWeight: 'normal'}}>
                {moment
                  .utc(item?.userInfo?.date)
                  .local()
                  .startOf('seconds')
                  .fromNow()}
              </Label>
            </Container>
            <Label
              size={15}
              color={COLORS.secondary}
              style={{fontWeight: 'normal'}}>
              {item.message}
            </Label>
            {item?.bigPictureUrl && (
              <Image
                source={{uri: item?.bigPictureUrl}}
                style={{width: '100%', height: 250, marginTop: 10}}
                resizeMode="cover"
              />
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FloatingAction
        color={COLORS.secondary}
        shadow={{
          shadowColor: COLORS.gray,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 5,
        }}
        floatingIcon={<Feather name="plus" size={24} color="white" />}
        onPressMain={() => navigation.navigate('Notification')}
        showBackground={false}
      />
    </SafeAreaView>
  );
};

export default Home;
