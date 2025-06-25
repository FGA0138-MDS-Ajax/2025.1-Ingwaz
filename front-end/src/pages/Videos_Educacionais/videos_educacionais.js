import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { WebView } from 'react-native-webview'; // Substituto
import { useNavigation } from '@react-navigation/native';

export default function VideosEducacionais() {
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarVideos = async () => {
      try {
        const resposta = await fetch('http://SEU_BACKEND_URL/api/videos/');
        const dados = await resposta.json();
        setVideos(dados);
      } catch (erro) {
        console.error('Erro ao carregar vídeos:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarVideos();
  }, []);

  const videosFiltrados = videos.filter((video) =>
    video.titulo.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{
            uri: 'https://i.postimg.cc/rs8x2VYX/Captura-de-tela-2025-06-22-235024.png',
          }}
          style={styles.bannerImage}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Buscar vídeo..."
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#66E266" />
      ) : (
        <FlatList
          data={videosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.videoContainer}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <WebView
                source={{ uri: item.url }}
                style={styles.video}
                javaScriptEnabled
                allowsFullscreenVideo
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  banner: {
    width: '100%',
    height: 170,
    marginBottom: 30,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  videoContainer: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  video: {
    width: '100%',
    height: 200,
  },
});
