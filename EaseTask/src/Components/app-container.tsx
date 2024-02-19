import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import theme from '../theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


type Props = {
  children: React.ReactNode;
};

export default function AppContainer(props: Props) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NativeBaseProvider theme={theme}>
      {props.children}
    </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
