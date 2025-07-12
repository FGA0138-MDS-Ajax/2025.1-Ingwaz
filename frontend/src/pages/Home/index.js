import React, { useContext } from 'react';
import { AuthContext } from '../../navigation/AuthContext'; // corrigido
import AgricultorHome from '../AgricultorHome';
import AnalistaHome from '../AnalistaHome';
import { View, Text } from 'react-native';

export default function Home() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <View>
        <Text>Carregando usuário...</Text>
      </View>
    );
  }

  switch (user.tipo) {
    case 'agricultor':
      return <AgricultorHome />;
    case 'analista':
      return <AnalistaHome />;
    default:
      return (
        <View>
          <Text>Tipo de usuário desconhecido: {user.tipo}</Text>
        </View>
      );
  }
}
