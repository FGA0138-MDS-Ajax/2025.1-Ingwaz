import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import Home from '../pages/Home';
import CultivosECriacoes from '../pages/CultivosECriacoes';
import RegistrarPlantio from '../pages/RegistrarPlantio';
import RegistrarPropriedade from '../pages/RegistrarPropriedade';
import CotacoesScreen from '../pages/CotacoesScreen';
import PerguntasScreen from '../pages/PerguntasScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cultivo e Criações" component={CultivosECriacoes} />
            <Stack.Screen name="RegistrarPlantio" component={RegistrarPlantio} />
            <Stack.Screen name="RegistrarPropriedade" component={RegistrarPropriedade} />
            <Stack.Screen
                name="Preços Produtos Rurais"
                component={CotacoesScreen}
                options={{
                    headerShown: true,
                    headerRight: () => (
                        <Text style={{ fontSize: 16, fontWeight: '400', color: '#555' }}>
                            CEPEA e{'\n'}HFBRASIL
                        </Text>
                    ),
                }}
            />
            <Stack.Screen
                name="Perguntas Agrícolas"
                component={PerguntasScreen}
                options={{
                    headerShown: true,
                    headerRight: () => (
                        <Text style={{ fontSize: 16, fontWeight: '400', color: '#555' }}>
                            EMBRAPA
                        </Text>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
