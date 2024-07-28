import { ToastProvider } from 'react-native-toast-notifications';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ToastNotiProvider = ({ children }: Props) => {
  return (
    <ToastProvider placement="top" duration={3000} animationType="slide-in">
      {children}
    </ToastProvider>
  );
};

export default ToastNotiProvider;
