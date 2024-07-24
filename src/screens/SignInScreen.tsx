import React from 'react';
import { SafeAreaView, StatusBar, Pressable, Text } from 'react-native';
import useNavi from '@hooks/useNavi';
import { isIOS, isWeb } from '@utils/deviceInfo';
import { GoogleSignin, statusCodes, isErrorWithCode } from '@react-native-google-signin/google-signin';
import { ANDROID_WEB_CLIENT_ID, IOS_WED_CLIENT_ID, IOS_CLIENT_ID, CLIENT_URL } from '@env';
import { login } from '@react-native-kakao/user';

const SignInScreen = () => {
  const { navigate, navigation } = useNavi();

  const goToHome = () => {
    if (isWeb && navigate) {
      navigate('/');
      return;
    }
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  // google 로그인
  GoogleSignin.configure({
    webClientId: isIOS ? IOS_WED_CLIENT_ID : ANDROID_WEB_CLIENT_ID,
    iosClientId: isIOS && IOS_CLIENT_ID,
    offlineAccess: true,
  });

  const signInWithGoogle = async () => {
    if (isWeb) {
      alert('웹은 아직 구글 로그인이 안 돼요:(');
      return;
    }
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();
      const idToken = res.idToken;
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('이미 로그인 프로세스가 진행 중입니다.');
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('로그인이 취소되었습니다.');
            break;
          case statusCodes.SIGN_IN_REQUIRED:
            console.log('로그인이 필요합니다. 다시 시도하세요.');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('플레이 서비스가 없거나 오래되었습니다.');
            break;
          default:
            console.log('알 수 없는 오류가 발생했습니다:', error);
        }
      } else {
        console.log('구글 로그인과 관련 없는 오류가 발생했습니다:', error);
      }
    }
  };

  // kakao 로그인
  const signInWithKakao = async () => {
    if (isWeb) {
      try {
        await login({ web: { redirectUri: CLIENT_URL, prompt: ['select_account'] } });
        return;
      } catch (error) {
        console.error('Kakao login failed:', error);
      }
    }

    try {
      const res = await login();
      const idToken = res.idToken;
    } catch (error) {
      console.error('Kakao login failed:', error);
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
      <Pressable onPress={goToHome} className="bg-green-300 p-4 text-green-900 m-10 border border-solid border-green-900 rounded">
        <Text>Go To Home</Text>
      </Pressable>
      <Pressable onPress={signInWithGoogle} className="bg-white p-4 text-black m-10 border border-solid border-[#e5e5e5] rounded-lg font-bold">
        <Text>Sign in with Google</Text>
      </Pressable>
      <Pressable onPress={signInWithKakao} className="bg-white p-4 text-black m-10 border border-solid border-[#e5e5e5] rounded-lg font-bold">
        <Text>Sign in with Kakao</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SignInScreen;
