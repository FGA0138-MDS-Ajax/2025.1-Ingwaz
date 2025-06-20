import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from '../front-end/src/navigation/routes'; // ajuste se estiver em outro local

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
