import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { THEME } from './src/theme'
import { Loading } from '@components/Loading';
import { SignIn } from '@screens/SignIn';

export default function App() {
  const [fontIsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (

    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent />
      {fontIsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}
