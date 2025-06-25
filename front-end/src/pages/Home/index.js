import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import AgricultorHome from './AgricultorHome';
import TecnicoHome from './TecnicoHome';
import AnalistaHome from './AnalistaHome';
import { AuthContext } from '../../navigation/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <View>
        <Text>Carregando usuário...</Text>
      </View>
    );
  }

  if (user.user_type === 'agricultor') return <AgricultorHome />;
  if (user.user_type === 'tecnico') return <TecnicoHome />;
  if (user.user_type === 'analista') return <AnalistaHome />;

  return (
    <View>
      <Text>Tipo de usuário desconhecido</Text>
    </View>
  );
}
