import { ToastProvider } from 'react-native-toast-notifications';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface Props {
  children: ReactNode;
}

const ToastNotiProvider = ({ children }: Props) => {
  return (
    <View>
      <ToastProvider placement="top" duration={3000} animationType="slide-in">
        {children}
      </ToastProvider>
    </View>
  );
};

export default ToastNotiProvider;
