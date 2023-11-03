import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

export const AuthSplash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    auth().onAuthStateChanged(exist => {
      exist
        ? null
        : setTimeout(() => {
            navigation.dispatch(StackActions.replace('SignIn'));
          }, 4000);
    });
  });
  const {height, width} = Dimensions.get('window');
  return (
    <View
      style={{
        flex: 1,
        elevation: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101729',
      }}>
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Image
          source={require('../../assets/splash.png')}
          style={{
            resizeMode: 'contain',
            width: wp('50'),
            height: hp('30'),
            zIndex: 6,
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontFamily: 'Poppins-Regular',
            zIndex: 4,
          }}>
          Auth
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
