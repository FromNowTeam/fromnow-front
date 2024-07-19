import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar, Pressable, Platform, Text} from 'react-native';
import {useNavigate} from 'react-router-dom';

const DetailMenuScreen = () => {
  const isWeb = Platform.OS === 'web';
  const navigate = isWeb ? useNavigate() : undefined;
  const navigation = isWeb
    ? undefined
    : useNavigation<NativeStackNavigationProp<any>>();

  const goToHome = () => {
    if (isWeb && navigate) {
      navigate('/');
      return;
    }
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
      <Pressable
        onPress={goToHome}
        className="bg-green-300 p-4 text-green-900 m-10 border border-solid border-green-900 rounded">
        <Text>DetailMenuScreen</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default DetailMenuScreen;
