import React from 'react';
import {Platform, Pressable, SafeAreaView, StatusBar, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigate} from 'react-router-dom';

const HomeScreen = () => {
  const isWeb = Platform.OS === 'web';
  const navigate = isWeb ? useNavigate() : undefined;
  const navigation = isWeb
    ? undefined
    : useNavigation<NativeStackNavigationProp<any>>();

  const goToDetailMenu = () => {
    if (isWeb && navigate) {
      navigate('/menu/detail');
      return;
    }
    if (navigation) {
      navigation.navigate('DetailMenu');
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
      <Pressable
        onPress={goToDetailMenu}
        className="bg-green-300 p-4 text-green-900 m-10 border border-solid border-green-900 rounded">
        <Text>Home</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
