import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import { getPlantios, getProperties } from '../services/api';



export default function ListarPlantiosScreen() {
    const [plantios, setPlantios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [propriedades, setPropriedades] = useState([]);


    useEffect(() => {
        async function fetchDados() {
            try {
                const [dadosPlantios, dadosPropriedades] = await Promise.all([
                    getPlantios(),
                    getProperties(),
                ]);

                setPlantios(dadosPlantios);
                if (Array.isArray(dadosPropriedades)) {
                    setPropriedades(dadosPropriedades);
                } else {
                    console.warn("Falha ao carregar propriedades:", dadosPropriedades);
                    setPropriedades([]);
                }

            } catch (e) {
                console.error('Erro ao buscar dados:', e);
            } finally {
                setCarregando(false);
            }
        }

        fetchDados();
    }, []);


    return (
        <ScreenLayout hasHeader={true}>
            <Text style={styles.titulo}>Plantios Registrados</Text>

            {carregando ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
                <FlatList
                    data={plantios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const propriedade = propriedades.find(p => p.id === item.propriedade);
                        const nomePropriedade = propriedade?.nome || `Propriedade #${item.propriedade}`;

                        return (
                            <View style={styles.card}>
                                <Text style={styles.cardId}>Plantio #{item.id}</Text>

                                <View style={styles.cardContent}>
                                    <Text style={styles.linha}>Cultura: {item.cultura}</Text>
                                    <Text style={styles.linha}>Área: {item.area} ha</Text>
                                    <Text style={styles.linha}>
                                        Data do Plantio: {new Date(item.data + 'T12:00:00').toLocaleDateString()}
                                    </Text>
                                    <Text style={styles.linha}>
                                        Estimativa Colheita: {new Date(item.estimativa_colheita + 'T12:00:00').toLocaleDateString()}
                                    </Text>
                                    <Text style={styles.linha}>Propriedade: {nomePropriedade}</Text>
                                </View>
                            </View>

                        );
                    }}

                />

            )}
        </ScreenLayout>
    );
}


const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#DCEDC8',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    linha: {
        marginBottom: 6,
        color: '#2e5339',
    },

    
    cardId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e5339',
        marginBottom: 8,
    },

    cardContent: {
        paddingLeft: 8,
    },





});

