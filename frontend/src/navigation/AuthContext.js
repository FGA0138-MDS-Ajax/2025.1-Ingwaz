import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      const tipo = await AsyncStorage.getItem('userTipo');
      const nome = await AsyncStorage.getItem('userNome');

      if (token && userId && tipo) {
        setUser({
          token,
          id: parseInt(userId),
          tipo,
          nome,
        });
      }

      setIsLoading(false);
    };

    loadStoredUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
