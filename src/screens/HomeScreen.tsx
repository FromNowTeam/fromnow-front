import React from 'react';
import { Pressable, SafeAreaView, StatusBar, Text } from 'react-native';
import useNavi from '@hooks/useNavi';
import { isWeb } from '@utils/deviceInfo';

const HomeScreen = () => {
  const { navigate, navigation } = useNavi();

  const goToLogin = () => {
    if (isWeb && navigate) {
      navigate('/signin');
      return;
    }
    if (navigation) {
      navigation.navigate('SignIn');
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
      <Pressable onPress={goToLogin} className="bg-green-300 p-4 text-green-900 m-10 border border-solid border-green-900 rounded">
        <Text>Go To SignIn</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
