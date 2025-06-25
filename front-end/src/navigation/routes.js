import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo, FontAwesome6,Feather } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from "../pages/Home/index";
import Chat from "../pages/Chat_ tecnico/index";
import Dashboard from "../pages/Cultivos_Criacoes/DashboardScreen";
import DashboardAtual from "../pages/Producao_Atual/DashboardAtualScreen";
import PedirCredito from "../pages/Pedir_Credito/CreditRequestScreen";
import Relatorio from "../pages/Relatorio/relatorio";
import VideosEducacionais from "../pages/Videos_Educacionais/videos_educacionais";
import LucrosVendas from "../pages/Lucros_venda/index";
import Welcome from "../pages/Intro/welcome";
import Login from "../pages/user/LoginScreen";
import FormCredit from "../pages/Pedir_Credito/FormCredit";
import AdicionarCriacao from "../pages/Cultivos_Criacoes/AdicionarCriacao";
import AcompanharCredit from "../pages/Pedir_Credito/AcompanharCredit";
import FaqScreen from "../pages/FAQ/FaqScreen";
import Cadastro from "../pages/user/RegisterScreen";
import RecuperarSenha from "../pages/user/RecuperarScreen";
import RedefinirSenha from "../pages/user/RedefinirSenha";
import CustomDrawer from "../Components/CustomDrawer";
import Perfil from "../pages/Profile/ProfileScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export function CreditoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PedirCredito" component={PedirCredito} />
      <Stack.Screen name="FormCredit" component={FormCredit} />
     <Stack.Screen name="AcompanharCredit" component={AcompanharCredit} />
     
    </Stack.Navigator>
  );
}



// Drawer 
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}
       
      >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{
          drawerIcon: ({ color, size }) => (
           <Feather name="user" size={size} color={color} />
          ),
        }}
      /> 
      <Drawer.Screen
        name="Videos Educacionais"
        component={VideosEducacionais}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="caret-forward-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cultivo e Criações"
        component={Dashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="seedling" size={size} color={color}/>
          ),
        }}
      />
      <Drawer.Screen
        name="Lucros e Vendas"
        component={LucrosVendas}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Produção Atual"
        component={DashboardAtual}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="agriculture" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
      
        name="Pedido de Crédito"
         component={PedirCredito}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-plus-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Relatório"
        component={Relatorio}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perguntas Frequentes"
        component={FaqScreen}
        options={{
          drawerIcon: ({ color, size }) => (
           <FontAwesome name="question-circle-o" size={size} color={color} />
          ),
        }}
      />
      
    </Drawer.Navigator>
  );
}

function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name= 'Cadastro' component={Cadastro}/>
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha}/>
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenha}/>
      <Stack.Screen name="Drawer" component={DrawerRoutes} />
      <Stack.Screen name="FormCredit" component={FormCredit}/>
      <Stack.Screen name="AdicionarCriacao" component={AdicionarCriacao}/>
      <Stack.Screen name="DashboardScreen" component={Dashboard}/>
      <Stack.Screen name="AcompanharCredit" component={AcompanharCredit} />

    </Stack.Navigator>
  );
}

export default Routes;




