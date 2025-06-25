import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawer(props) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Exemplo de usuário 
    setUsuario({
      nome: 'Maria',
      avatar_url: 'https://i.postimg.cc/1zvCWHrP/189715.png',
      user_type: 'agricultor',
      fazenda: 'Fazenda Boa vista',
    });

    /*
    // Para usar no backend
    const carregarUsuario = async () => {
      try {
        const resposta = await fetch('http://SEU_BACKEND_URL/api/usuario-logado/');
        const dados = await resposta.json();
        setUsuario(dados);
      } catch (erro) {
        console.error('Erro ao carregar usuário:', erro);
      }
    };

    carregarUsuario();
    */
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff' }}>
        <View style={styles.header}>
          {usuario && (
            <>
              <Image
                source={{ uri: usuario.avatar_url || 'https://i.postimg.cc/1zvCWHrP/189715.png' }}
                style={styles.avatar}
              />
              <Text style={styles.nome}>{usuario.nome}</Text>
              {usuario.user_type === 'agricultor' && (
                <Text style={styles.subtitulo}>{usuario.fazenda}</Text>
              )}
            </>
          )}
          {!usuario && <Text>Carregando usuário...</Text>}
        </View>

        <View style={styles.menu}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            // Limpar autenticação / resetar navegação
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
        >
          <Ionicons name="exit-outline" size={22} color="#333" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitulo: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  menu: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
});
