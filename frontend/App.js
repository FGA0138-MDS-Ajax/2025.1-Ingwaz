import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/routes';
import { AuthProvider } from './src/navigation/AuthContext'; // ⬅️ novo import

export default function App() {
  return (
    <AuthProvider> {/* ⬅️ envolve tudo */}
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
