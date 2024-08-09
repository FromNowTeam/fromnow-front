import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, Text } from 'react-native';
import useNavi from '@hooks/useNavi';
import { isWeb } from '@utils/deviceInfo';
import { useLocation } from 'react-router-dom';
import { issueAccessTokenWithCodeWeb } from '@react-native-kakao/user';
import { CLIENT_URL } from '@env';

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

  // kakao web 로그인
  const location = isWeb ? useLocation() : { search: '' };
  const [kakaoWebIdToken, setKakaoWebIdToken] = useState('');
  const accessTokenIssued = useRef(false);
  useEffect(() => {
    if (!isWeb) return;
    const code = new URLSearchParams(location.search).get('code');
    if (!code) return;
    const fetchAccessToken = async () => {
      if (!code || accessTokenIssued.current) return;

      try {
        const { idToken } = await issueAccessTokenWithCodeWeb({
          code,
          redirectUri: CLIENT_URL,
        });
        setKakaoWebIdToken(idToken);
        accessTokenIssued.current = true;
      } catch (error) {
        console.error('Failed to issue token:', error);
      }
    };

    fetchAccessToken();
  }, [location.search]);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
      <Pressable onPress={goToLogin} className="bg-green-300 p-4 text-green-900 m-10 border border-solid border-green-900 rounded">
        <Text className="font-UhBee">Go To SignIn</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;
