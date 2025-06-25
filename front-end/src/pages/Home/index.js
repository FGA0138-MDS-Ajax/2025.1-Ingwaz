import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import AgricultorHome from './AgricultorHome';
import TecnicoHome from './TecnicoHome';
import AnalistaHome from './AnalistaHome';
import { AuthContext } from '../../navigation/AuthContext';

import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <View>
        <Text>Carregando usuário...</Text>
      </View>
    );
  }

  if (user.tipo === 'agricultor') return <AgricultorHome />;
  if (user.tipo === 'tecnico') return <TecnicoHome />;
  if (user.tipo === 'analista') return <AnalistaHome />;

  return (
    <View>
      <Text>Tipo de usuário desconhecido</Text>
    </View>
  );
}