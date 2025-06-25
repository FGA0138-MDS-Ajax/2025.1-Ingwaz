import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/routes'; // ou ../front-end/src/... se for outro diretório
import { AuthProvider } from './src/navigation/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}

